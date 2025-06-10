import { renderHook, act, waitFor } from "@testing-library/react";
import useMyProfileFollowMutate from "@/domains/user/profile/hooks/mutations/useMyProfileFollowMutate";
import followUser from "@/domains/user/shared/api/followUser";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProfileData } from "@/domains/user/profile/types/profileTypes";
import type { InfiniteData } from "@tanstack/react-query";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

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

describe("useMyProfileFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;

  const myProfileKey = queryKeys.profile.my.queryKey;
  const myFollowersKey = queryKeys.profile.my._ctx.followers._def;

  const fakeUid = "user2";
  const myUid = "user1";

  const fakeMyProfile: ProfileData = {
    uid: myUid,
    followings: ["other"]
  } as ProfileData;

  const fakeFollowers: InfiniteData<ProfileData[], unknown> = {
    pages: [
      [
        { uid: fakeUid, followers: ["other"] } as ProfileData,
        { uid: "user3", followers: ["somebody"] } as ProfileData
      ]
    ],
    pageParams: []
  };

  let cancelSpy: unknown;
  let setDataSpy: unknown;
  let invalidateSpy: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { uid: myUid } // myUid = "user1"
      })
    );

    queryClient.setQueryData(myProfileKey, fakeMyProfile);
    queryClient.setQueryData(myFollowersKey, fakeFollowers);

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 cancelQueries와 setQueryData로 optimistic 업데이트를 수행합니다.", async () => {
    const { result } = renderHook(() => useMyProfileFollowMutate(fakeUid), {
      wrapper
    });

    act(() => {
      result.current.myProfilefollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myFollowersKey });

      expect(setDataSpy).toHaveBeenCalledWith(myProfileKey, {
        uid: myUid,
        followings: ["other", fakeUid]
      });
      expect(setDataSpy).toHaveBeenCalledWith(myFollowersKey, {
        pages: [
          [
            {
              uid: fakeUid,
              followers: ["other", "user1"]
            },
            {
              uid: "user3",
              followers: ["somebody"]
            }
          ]
        ],
        pageParams: []
      });

      const updatedProfile = queryClient.getQueryData(
        myProfileKey
      ) as ProfileData;
      expect(updatedProfile.followings).toContain(fakeUid);

      const updatedFollowers = queryClient.getQueryData(
        myFollowersKey
      ) as InfiniteData<ProfileData[], unknown>;
      const followedUser = updatedFollowers.pages[0].find(
        (user) => user.uid === fakeUid
      );
      expect(followedUser?.followers).toContain(myUid);
      expect(toast.success).toHaveBeenCalledWith("유저 팔로우에 성공했어요.");
    });
  });

  it("onError에서 캐시를 롤백하고 toast.error를 호출합니다.", async () => {
    mockFollowUser.mockRejectedValue({
      response: { data: { message: "팔로우 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useMyProfileFollowMutate(fakeUid), {
      wrapper
    });

    act(() => {
      result.current.myProfilefollowMutate();
    });

    await waitFor(() => {
      const rolledBackProfile = queryClient.getQueryData(
        myProfileKey
      ) as ProfileData;
      expect(rolledBackProfile.followings).not.toContain(fakeUid);

      const rolledBackFollowers = queryClient.getQueryData(
        myFollowersKey
      ) as InfiniteData<ProfileData[], unknown>;
      const follower = rolledBackFollowers.pages[0].find(
        (user) => user.uid === fakeUid
      );
      expect(follower?.followers).not.toContain(myUid);

      expect(toast.warn).toHaveBeenCalledWith(
        "유저 팔로우에 실패했어요.\n 잠시 후 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 invalidateQueries가 호출됩니다.", async () => {
    mockFollowUser.mockResolvedValue({ data: { message: "ok" } });

    const { result } = renderHook(() => useMyProfileFollowMutate(fakeUid), {
      wrapper
    });

    act(() => {
      result.current.myProfilefollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myFollowersKey });
    });
  });
});
