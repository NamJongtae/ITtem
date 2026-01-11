import { renderHook, act, waitFor } from "@testing-library/react";
import useUserProfileUnFollowInListMutate from "@/domains/user/profile/hooks/mutations/useUserProfileUnFollowInListMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { InfiniteData } from "@tanstack/react-query";
import type {
  FollowUserData,
  ProfileData
} from "@/domains/user/profile/types/profileTypes";

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

jest.mock("next/navigation", () => ({
  __esModule: true,
  useParams: jest.fn()
}));

type InfiniteProfileList = InfiniteData<FollowUserData[], unknown>;
type FetchError = { status: number; message: string };

describe("useUserProfileUnFollowInListMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const mockUnfollowUser = unfollowUser as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as unknown as jest.Mock;

  const myUid = "me";
  const uid = "target"; // 언팔 대상
  const pageUid = "pageUser"; // 현재 페이지 uid(params.uid)

  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;

  const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  const makePageFollowListKey = (listType: "followers" | "followings") =>
    listType === "followers"
      ? queryKeys.profile.user(pageUid)._ctx.followers({
          uid: pageUid,
          limit: 10
        }).queryKey
      : queryKeys.profile.user(pageUid)._ctx.followings({
          uid: pageUid,
          limit: 10
        }).queryKey;

  let cancelSpy: jest.SpyInstance;
  let setDataSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;

  const seedCommonCache = () => {
    queryClient.setQueryData(myProfileQueryKey, { uid: myUid } as ProfileData);
    queryClient.setQueryData(myFollowingsQueryKey, {
      pages: [[]],
      pageParams: []
    } as InfiniteProfileList);

    queryClient.setQueryData(targetProfileQueryKey, {
      uid,
      followersCount: 10,
      isFollow: true
    } as unknown as ProfileData);

    queryClient.setQueryData(targetFollowersQueryKey, {
      pages: [[]],
      pageParams: []
    } as InfiniteProfileList);

    queryClient.setQueryData(targetFollowingsQueryKey, {
      pages: [[]],
      pageParams: []
    } as InfiniteProfileList);
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ uid: pageUid });
    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );

    seedCommonCache();

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("followers 리스트에서 onMutate가 pageFollowList를 optimistic 업데이트합니다(대상 isFollow false + followersCount-1, 내 followingsCount-1).", async () => {
    const listType: "followers" = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const previousPageFollowList: InfiniteProfileList = {
      pages: [
        [
          {
            uid,
            isFollow: true,
            followersCount: 3
          } as FollowUserData,
          {
            uid: myUid,
            followingsCount: 7
          } as FollowUserData
        ]
      ],
      pageParams: []
    };

    queryClient.setQueryData(pageFollowListQueryKey, previousPageFollowList);

    const { result } = renderHook(
      () => useUserProfileUnFollowInListMutate({ uid, listType }),
      { wrapper }
    );

    act(() => {
      result.current.userUnfollowMutate();
    });

    await waitFor(() => {
      // ✅ cancelQueries 5개
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileQueryKey });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: myFollowingsQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetProfileQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowersQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: pageFollowListQueryKey
      });

      // ✅ optimistic patch 결과 확인 (queryClient.getQueryData로 검증)
      const updated = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteProfileList;

      const targetItem = updated.pages[0].find((u) => u.uid === uid)!;
      expect(targetItem.isFollow).toBe(false);
      expect(targetItem.followersCount).toBe(2);

      const meItem = updated.pages[0].find((u) => u.uid === myUid)!;
      expect(meItem.followingsCount).toBe(6);
    });

    // 참고: setQueryData가 pageFollowList에 호출되었는지만 강하게 체크하고 싶으면 아래도 가능
    expect(setDataSpy).toHaveBeenCalledWith(
      pageFollowListQueryKey,
      expect.any(Object)
    );
  });

  it("followings 리스트에서도 onMutate가 pageFollowList를 optimistic 업데이트합니다.", async () => {
    const listType: "followings" = "followings";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const previousPageFollowList: InfiniteProfileList = {
      pages: [
        [
          {
            uid,
            isFollow: true,
            followersCount: 1
          } as FollowUserData,
          {
            uid: myUid,
            followingsCount: 1
          } as FollowUserData
        ]
      ],
      pageParams: []
    };

    queryClient.setQueryData(pageFollowListQueryKey, previousPageFollowList);

    const { result } = renderHook(
      () => useUserProfileUnFollowInListMutate({ uid, listType }),
      { wrapper }
    );

    act(() => {
      result.current.userUnfollowMutate();
    });

    await waitFor(() => {
      const updated = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteProfileList;

      const targetItem = updated.pages[0].find((u) => u.uid === uid)!;
      expect(targetItem.isFollow).toBe(false);
      expect(targetItem.followersCount).toBe(0);

      const meItem = updated.pages[0].find((u) => u.uid === myUid)!;
      expect(meItem.followingsCount).toBe(0);
    });
  });

  it("onError에서 pageFollowList 캐시를 롤백하고 status 409이면 toast.warn을 호출합니다.", async () => {
    const listType: "followers" = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const previousPageFollowList: InfiniteProfileList = {
      pages: [[{ uid, isFollow: true, followersCount: 10 } as FollowUserData]],
      pageParams: []
    };

    queryClient.setQueryData(pageFollowListQueryKey, previousPageFollowList);

    const err: FetchError = { status: 409, message: "dup" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(
      () => useUserProfileUnFollowInListMutate({ uid, listType }),
      { wrapper }
    );

    act(() => {
      result.current.userUnfollowMutate();
    });

    await waitFor(() => {
      // ✅ 롤백 확인
      expect(queryClient.getQueryData(pageFollowListQueryKey)).toEqual(
        previousPageFollowList
      );

      expect(toast.warn).toHaveBeenCalledWith("이미 언팔로우한 유저에요.");
    });
  });

  it("onError에서 status가 409가 아니면 일반 실패 toast.warn을 호출합니다.", async () => {
    const listType: "followers" = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const previousPageFollowList: InfiniteProfileList = {
      pages: [[{ uid, isFollow: true, followersCount: 10 } as FollowUserData]],
      pageParams: []
    };

    queryClient.setQueryData(pageFollowListQueryKey, previousPageFollowList);

    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(
      () => useUserProfileUnFollowInListMutate({ uid, listType }),
      { wrapper }
    );

    act(() => {
      result.current.userUnfollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(
        "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 myProfile/myFollowings/targetProfile/targetFollowers/targetFollowings invalidateQueries 호출합니다.", async () => {
    const listType: "followers" = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    queryClient.setQueryData(pageFollowListQueryKey, {
      pages: [[{ uid, isFollow: true, followersCount: 1 } as FollowUserData]],
      pageParams: []
    } as InfiniteProfileList);

    mockUnfollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(
      () => useUserProfileUnFollowInListMutate({ uid, listType }),
      { wrapper }
    );

    act(() => {
      result.current.userUnfollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: myProfileQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: myFollowingsQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: targetProfileQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: targetFollowersQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: targetFollowingsQueryKey
      });
    });
  });
});
