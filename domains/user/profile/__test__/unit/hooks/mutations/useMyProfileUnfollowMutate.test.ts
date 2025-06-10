import { renderHook, act, waitFor } from "@testing-library/react";
import useMyProfileUnfollowMutate from "@/domains/user/profile/hooks/mutations/useMyProfileUnfollowMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProfileData } from "@/domains/user/profile/types/profileTypes";
import type { InfiniteData } from "@tanstack/react-query";

jest.mock("@/domains/user/shared/api/unfollowUser");
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

import useAuthStore from "@/domains/auth/shared/common/store/authStore";

describe("useMyProfileUnfollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUnfollowUser = unfollowUser as jest.Mock;

  const myUid = "user1";
  const targetUid = "user2";

  const myProfileKey = queryKeys.profile.my.queryKey;
  const myFollowingsKey = queryKeys.profile.my._ctx.followings._def;
  const userFollowersKey =
    queryKeys.profile.user(targetUid)._ctx.followers._def;

  const fakeMyProfile: ProfileData = {
    uid: myUid,
    followings: [targetUid, "user3"]
  } as ProfileData;

  const fakeMyFollowings: InfiniteData<ProfileData[], unknown> = {
    pages: [
      [
        { uid: targetUid, followers: ["other"] } as ProfileData,
        { uid: "user3", followers: ["other"] } as ProfileData
      ]
    ],
    pageParams: []
  };

  const fakeUserFollowers: InfiniteData<ProfileData[], unknown> = {
    pages: [[{ uid: targetUid, followers: [myUid, "other"] } as ProfileData]],
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
    queryClient.setQueryData(myFollowingsKey, fakeMyFollowings);
    queryClient.setQueryData(userFollowersKey, fakeUserFollowers);

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 cancelQueries와 setQueryData로 optimistic 업데이트를 수행합니다.", async () => {
    const { result } = renderHook(() => useMyProfileUnfollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myFollowingsKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: userFollowersKey });

      expect(setDataSpy).toHaveBeenCalledWith(myProfileKey, {
        uid: myUid,
        followings: ["user3"]
      });

      expect(setDataSpy).toHaveBeenCalledWith(myFollowingsKey, {
        pages: [[{ uid: "user3", followers: ["other"] }]],
        pageParams: []
      });

      expect(setDataSpy).toHaveBeenCalledWith(userFollowersKey, {
        pages: [[{ followers: ["other"], uid: targetUid }]],
        pageParams: []
      });

      expect(toast.success).toHaveBeenCalledWith("유저 언팔로우에 성공했어요.");
    });
  });

  it("onError에서 캐시를 롤백하고 toast.warn을 호출합니다.", async () => {
    mockUnfollowUser.mockRejectedValue({
      response: { data: { message: "언팔로우 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useMyProfileUnfollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      const rolledBackProfile = queryClient.getQueryData(
        myProfileKey
      ) as ProfileData;
      expect(rolledBackProfile.followings).toContain(targetUid);

      const rolledBackFollowings = queryClient.getQueryData(
        myFollowingsKey
      ) as InfiniteData<ProfileData[], unknown>;
      const stillExists = rolledBackFollowings.pages[0].some(
        (p) => p.uid === targetUid
      );
      expect(stillExists).toBe(true);

      const rolledBackFollowers = queryClient.getQueryData(
        userFollowersKey
      ) as InfiniteData<ProfileData[], unknown>;
      const stillFollower =
        rolledBackFollowers.pages[0][0].followers.includes(myUid);
      expect(stillFollower).toBe(true);

      expect(toast.warn).toHaveBeenCalledWith(
        "유저 언팔로우에 실패했어요.\n 잠시 후 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 모든 관련 캐시 invalidateQueries 호출합니다.", async () => {
    mockUnfollowUser.mockResolvedValue({ data: { message: "ok" } });

    const { result } = renderHook(() => useMyProfileUnfollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myFollowingsKey });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: userFollowersKey
      });
    });
  });
});
