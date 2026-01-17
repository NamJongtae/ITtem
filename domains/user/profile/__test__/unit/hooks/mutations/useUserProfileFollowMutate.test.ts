import { renderHook, act, waitFor } from "@testing-library/react";
import useUserProfileFollowMutate from "@/domains/user/profile/hooks/mutations/useUserProfileFollowMutate";
import followUser from "@/domains/user/shared/api/followUser";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type {
  ProfileData,
  FollowUserData
} from "@/domains/user/profile/types/profileTypes";
import type { InfiniteData } from "@tanstack/react-query";

jest.mock("@/domains/user/shared/api/followUser");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

type FetchError = {
  status: number;
  message: string;
};

type InfiniteProfileList = InfiniteData<FollowUserData[], unknown>;

describe("useUserProfileFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

  const myUid = "user1";
  const targetUid = "user2";

  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(targetUid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followers({ uid: targetUid, limit: 10 }).queryKey;

  const targetFollowingsQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followings({ uid: targetUid, limit: 10 }).queryKey;

  const targetFollowStatusQueryKey =
    queryKeys.profile.user(targetUid)._ctx.isFollow.queryKey;

  let cancelSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;

  const fakeMyProfile: ProfileData = {
    uid: myUid,
    nickname: "me",
    profileImg: "me.png",
    followersCount: 1,
    followingsCount: 3,
    productIds: [],
    reviewInfo: { reviewPercentage: 77 }
  } as any;

  const fakeTargetProfile: ProfileData = {
    uid: targetUid,
    followersCount: 10
  } as any;

  const fakeTargetFollowers: InfiniteProfileList = {
    pages: [
      [
        {
          uid: "other",
          nickname: "other",
          profileImg: "o.png",
          followersCount: 0,
          followingsCount: 0,
          isFollow: false,
          productIds: [],
          reviewPercentage: 0
        }
      ]
    ],
    pageParams: []
  };

  const fakeTargetFollowings: InfiniteProfileList = {
    pages: [
      [
        {
          uid: myUid,
          nickname: "me",
          profileImg: "me.png",
          followersCount: 1,
          followingsCount: 3,
          isFollow: false,
          productIds: [],
          reviewPercentage: 77
        },
        {
          uid: "someone",
          nickname: "s",
          profileImg: "s.png",
          followersCount: 0,
          followingsCount: 0,
          isFollow: false,
          productIds: [],
          reviewPercentage: 0
        }
      ]
    ],
    pageParams: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();

    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );

    queryClient.setQueryData(myProfileQueryKey, fakeMyProfile);
    queryClient.setQueryData(targetProfileQueryKey, fakeTargetProfile);
    queryClient.setQueryData(targetFollowersQueryKey, fakeTargetFollowers);
    queryClient.setQueryData(targetFollowingsQueryKey, fakeTargetFollowings);

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
    removeSpy = jest.spyOn(queryClient, "removeQueries");
  });

  it("onMutate: targetProfile/targetFollowers/targetFollowings/targetFollowStatus cancel + optimistic 업데이트", async () => {
    mockFollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetProfileQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowersQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowingsQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });

      const updatedTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as any;
      expect(updatedTargetProfile.followersCount).toBe(11);

      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(true);

      const updatedFollowers = queryClient.getQueryData(
        targetFollowersQueryKey
      ) as InfiniteProfileList;

      expect(updatedFollowers.pages[0][0].uid).toBe(myUid);
      expect(updatedFollowers.pages[0][0].followingsCount).toBe(4);
      expect(updatedFollowers.pages[0].some((u) => u.uid === "other")).toBe(
        true
      );

      const updatedFollowings = queryClient.getQueryData(
        targetFollowingsQueryKey
      ) as InfiniteProfileList;

      const myCard = updatedFollowings.pages[0].find((u) => u.uid === myUid)!;
      expect(myCard.followingsCount).toBe(4);
    });
  });

  it("onError: previousFollowStatus가 undefined면 removeQueries + toast.warn(409)", async () => {
    const err: FetchError = { status: 409, message: "dup" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(targetProfileQueryKey)).toEqual(
        fakeTargetProfile
      );
      expect(queryClient.getQueryData(targetFollowersQueryKey)).toEqual(
        fakeTargetFollowers
      );
      expect(queryClient.getQueryData(targetFollowingsQueryKey)).toEqual(
        fakeTargetFollowings
      );

      expect(removeSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });

      expect(toast.warn).toHaveBeenCalledWith("이미 팔로우한 유저에요.");
    });
  });

  it("onError: previousFollowStatus가 true면 true로 롤백됩니다.", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    queryClient.setQueryData(targetFollowStatusQueryKey, true);

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(true);
    });
  });

  it("onError: previousFollowStatus가 false여도 false로 롤백됩니다.", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    queryClient.setQueryData(targetFollowStatusQueryKey, false);

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(false);
      expect(removeSpy).not.toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });
    });
  });

  it("onSettled: targetFollowStatusQueryKey만 invalidateQueries 합니다.", async () => {
    mockFollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
