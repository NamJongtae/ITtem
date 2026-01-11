import { renderHook, act, waitFor } from "@testing-library/react";
import useMyProfileUnfollowInListMutate from "@/domains/user/profile/hooks/mutations/useMyProfileUnfollowInListMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProfileData, FollowUserData } from "@/domains/user/profile/types/profileTypes";
import type { InfiniteData } from "@tanstack/react-query";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

jest.mock("@/domains/user/shared/api/unfollowUser");

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

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;

describe("useMyProfileUnfollowInListMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUnfollowUser = unfollowUser as jest.Mock;

  const myUid = "user1";
  const targetUid = "user2";

  // ✅ 훅 내부와 동일한 queryKey 구성
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const myFollowersQueryKey = queryKeys.profile.my._ctx.followers({
    uid: myUid,
    limit: 10
  }).queryKey;

  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(targetUid).queryKey;

  const targetFollowersQueryKey = queryKeys.profile.user(targetUid)._ctx.followers({
    uid: targetUid,
    limit: 10
  }).queryKey;

  const fakeMyProfile: ProfileData = {
    uid: myUid,
    followingsCount: 2
  } as ProfileData;

  const fakeMyFollowings: InfiniteFollowList = {
    pages: [
      [
        {
          uid: targetUid,
          nickname: "t",
          profileImg: "",
          followingsCount: 0,
          followersCount: 0,
          isFollow: true,
          productIds: [],
          reviewPercentage: 0
        },
        {
          uid: "user3",
          nickname: "u3",
          profileImg: "",
          followingsCount: 0,
          followersCount: 0,
          isFollow: true,
          productIds: [],
          reviewPercentage: 0
        }
      ]
    ],
    pageParams: []
  };

  const fakeMyFollowers: InfiniteFollowList = {
    pages: [
      [
        {
          uid: targetUid,
          nickname: "t",
          profileImg: "",
          followingsCount: 0,
          followersCount: 5,
          isFollow: true,
          productIds: [],
          reviewPercentage: 0
        }
      ]
    ],
    pageParams: []
  };

  let cancelSpy: jest.SpyInstance;
  let setDataSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );

    queryClient.setQueryData(myProfileQueryKey, fakeMyProfile);
    queryClient.setQueryData(myFollowersQueryKey, fakeMyFollowers);
    queryClient.setQueryData(myFollowingsQueryKey, fakeMyFollowings);

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 cancelQueries 및 optimistic 업데이트를 수행합니다.", async () => {
    const { result } = renderHook(
      () => useMyProfileUnfollowInListMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      // ✅ cancelQueries 3개
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileQueryKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myFollowersQueryKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myFollowingsQueryKey });

      // ✅ myProfile: followingsCount -1
      expect(setDataSpy).toHaveBeenCalledWith(
        myProfileQueryKey,
        expect.objectContaining({ followingsCount: 1 })
      );

      // ✅ myFollowings: targetUid 제거
      const updatedMyFollowings = queryClient.getQueryData(myFollowingsQueryKey) as InfiniteFollowList;
      const stillExistsInFollowings = updatedMyFollowings.pages[0].some((p) => p.uid === targetUid);
      expect(stillExistsInFollowings).toBe(false);

      // ✅ myFollowers: targetUid 항목 isFollow false + followersCount -1
      const updatedMyFollowers = queryClient.getQueryData(myFollowersQueryKey) as InfiniteFollowList;
      expect(updatedMyFollowers.pages[0][0].isFollow).toBe(false);
      expect(updatedMyFollowers.pages[0][0].followersCount).toBe(4);
    });
  });

  it("onError에서 캐시를 롤백하고 status 409이면 toast.warn을 호출합니다.", async () => {
    const err: FetchError = { status: 409, message: "dup" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(
      () => useMyProfileUnfollowInListMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      // ✅ 롤백 확인
      expect(queryClient.getQueryData(myProfileQueryKey)).toEqual(fakeMyProfile);
      expect(queryClient.getQueryData(myFollowersQueryKey)).toEqual(fakeMyFollowers);
      expect(queryClient.getQueryData(myFollowingsQueryKey)).toEqual(fakeMyFollowings);

      expect(toast.warn).toHaveBeenCalledWith("이미 언팔로우한 유저에요.");
    });
  });

  it("onError에서 status가 409가 아니면 일반 실패 toast.warn을 호출합니다.", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(
      () => useMyProfileUnfollowInListMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(
        "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 targetProfile/targetFollowers 캐시만 invalidateQueries 호출합니다.", async () => {
    mockUnfollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(
      () => useMyProfileUnfollowInListMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.myProfileUnfollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: targetProfileQueryKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: targetFollowersQueryKey });
    });
  });
});
