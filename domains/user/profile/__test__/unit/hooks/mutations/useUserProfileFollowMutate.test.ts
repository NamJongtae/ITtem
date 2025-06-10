import { renderHook, act, waitFor } from "@testing-library/react";
import useUserProfileFollowMutate from "@/domains/user/profile/hooks/mutations/useUserProfileFollowMutate";
import followUser from "@/domains/user/shared/api/followUser";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProfileData } from "@/domains/user/profile/types/profileTypes";
import type { InfiniteData } from "@tanstack/react-query";

jest.mock("@/domains/user/shared/api/followUser");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("uid=user2")
}));

describe("useUserProfileFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;

  const myUid = "user1";
  const targetUid = "user2";

  const myProfileKey = queryKeys.profile.my.queryKey;
  const userProfileKey = queryKeys.profile.user(targetUid).queryKey;
  const userFollowingsKey =
    queryKeys.profile.user(targetUid)._ctx.followings._def;
  const userFollowersKey =
    queryKeys.profile.user(targetUid)._ctx.followers._def;

  const fakeMyProfile: ProfileData = {
    uid: myUid,
    followings: ["other"]
  } as ProfileData;

  const fakeUserProfile: ProfileData = {
    uid: targetUid,
    followers: ["other"]
  } as ProfileData;

  const fakeUserFollowings: InfiniteData<ProfileData[], unknown> = {
    pages: [[{ uid: targetUid, followers: ["other"] } as ProfileData]],
    pageParams: []
  };

  const fakeUserFollowers: InfiniteData<ProfileData[], unknown> = {
    pages: [[{ uid: targetUid, followers: ["other"] } as ProfileData]],
    pageParams: []
  };

  let cancelSpy: jest.SpyInstance;
  let setDataSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { uid: myUid }
      })
    );

    queryClient.setQueryData(myProfileKey, fakeMyProfile);
    queryClient.setQueryData(userProfileKey, fakeUserProfile);
    queryClient.setQueryData(userFollowingsKey, fakeUserFollowings);
    queryClient.setQueryData(userFollowersKey, fakeUserFollowers);

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 cancelQueries 및 optimistic 업데이트 수행", async () => {
    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: userProfileKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: userFollowingsKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: userFollowersKey });

      expect(setDataSpy).toHaveBeenCalledWith(myProfileKey, {
        uid: myUid,
        followings: ["other", targetUid]
      });

      expect(setDataSpy).toHaveBeenCalledWith(userProfileKey, {
        uid: targetUid,
        followers: ["other", myUid]
      });

      expect(setDataSpy).toHaveBeenCalledWith(userFollowingsKey, {
        pages: [[{ uid: targetUid, followers: ["other", myUid] }]],
        pageParams: []
      });

      expect(setDataSpy).toHaveBeenCalledWith(userFollowersKey, {
        pages: [[{ uid: targetUid, followers: ["other", myUid] }]],
        pageParams: []
      });

      expect(toast.success).toHaveBeenCalledWith("유저 팔로우에 성공했어요.");
    });
  });

  it("onError에서 캐시를 롤백하고 toast.warn을 호출합니다.", async () => {
    mockFollowUser.mockRejectedValue({
      response: { data: { message: "팔로우 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      const rolledBackProfile = queryClient.getQueryData(
        myProfileKey
      ) as ProfileData;
      expect(rolledBackProfile.followings).not.toContain(targetUid);

      const rolledBackUserProfile = queryClient.getQueryData(
        userProfileKey
      ) as ProfileData;
      expect(rolledBackUserProfile.followers).not.toContain(myUid);

      const rolledBackFollowers = queryClient.getQueryData(
        userFollowersKey
      ) as InfiniteData<ProfileData[], unknown>;
      expect(rolledBackFollowers.pages[0][0].followers).not.toContain(myUid);

      expect(toast.warn).toHaveBeenCalledWith(
        "유저 팔로우에 실패했어요.\n 잠시 후 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 모든 관련 invalidateQueries 호출합니다.", async () => {
    mockFollowUser.mockResolvedValue({ data: { message: "ok" } });

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: userProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: userFollowingsKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: userFollowersKey
      });
    });
  });
});
