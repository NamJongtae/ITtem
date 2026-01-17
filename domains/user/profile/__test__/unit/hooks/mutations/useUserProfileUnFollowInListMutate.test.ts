import { renderHook, act, waitFor } from "@testing-library/react";
import useUserProfileUnFollowInListMutate from "@/domains/user/profile/hooks/mutations/useUserProfileUnFollowInListMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { InfiniteData } from "@tanstack/react-query";
import type { FollowUserData } from "@/domains/user/profile/types/profileTypes";

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
  const pageUid = "pageUser"; // params.uid

  const limit = 10;

  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;

  const makePageFollowListKey = (listType: "followers" | "followings") =>
    listType === "followers"
      ? queryKeys.profile.user(pageUid)._ctx.followers({
          uid: pageUid,
          limit
        }).queryKey
      : queryKeys.profile.user(pageUid)._ctx.followings({
          uid: pageUid,
          limit
        }).queryKey;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear(); // ✅ 테스트 격리

    mockUseParams.mockReturnValue({ uid: pageUid });
    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );

    // 훅이 cancelQueries 하는 대상(없어도 되지만 키 존재시키면 안정적)
    queryClient.setQueryData(targetProfileQueryKey, { uid });
  });

  it("followers 리스트: onMutate가 pageFollowList를 optimistic 업데이트합니다(대상 isFollow=false + followersCount-1, 내 followingsCount-1).", async () => {
    const listType = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const previousPageFollowList: InfiniteProfileList = {
      pages: [
        [
          { uid, isFollow: true, followersCount: 3 } as FollowUserData,
          { uid: myUid, followingsCount: 7 } as FollowUserData
        ]
      ],
      pageParams: []
    };

    queryClient.setQueryData(pageFollowListQueryKey, previousPageFollowList);

    const cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    const setSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(
      () => useUserProfileUnFollowInListMutate({ uid, listType }),
      { wrapper }
    );

    act(() => {
      result.current.userUnfollowMutate();
    });

    await waitFor(() => {
      // ✅ cancelQueries는 targetProfileQueryKey 1개만
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetProfileQueryKey
      });

      // ✅ pageFollowList optimistic 반영
      const updated = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteProfileList;

      const targetItem = updated.pages[0].find((u) => u.uid === uid)!;
      expect(targetItem.isFollow).toBe(false);
      expect(targetItem.followersCount).toBe(2);

      const meItem = updated.pages[0].find((u) => u.uid === myUid)!;
      expect(meItem.followingsCount).toBe(6);

      // setQueryData가 pageFollowList에도 호출됨(강하게 체크하고 싶을 때)
      expect(setSpy).toHaveBeenCalledWith(
        pageFollowListQueryKey,
        expect.any(Object)
      );
    });
  });

  it("followings 리스트: onMutate가 pageFollowList를 optimistic 업데이트합니다(0 미만 방지).", async () => {
    const listType = "followings";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const previousPageFollowList: InfiniteProfileList = {
      pages: [
        [
          { uid, isFollow: true, followersCount: 1 } as FollowUserData,
          { uid: myUid, followingsCount: 1 } as FollowUserData
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
      expect(targetItem.followersCount).toBe(0); // 1 -> 0

      const meItem = updated.pages[0].find((u) => u.uid === myUid)!;
      expect(meItem.followingsCount).toBe(0); // 1 -> 0
    });
  });

  it("onError: optimistic 롤백 + status 409이면 toast.warn을 호출합니다.", async () => {
    const listType = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const original: InfiniteProfileList = {
      pages: [[{ uid, isFollow: true, followersCount: 10 } as FollowUserData]],
      pageParams: []
    };
    queryClient.setQueryData(pageFollowListQueryKey, original);

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
      expect(queryClient.getQueryData(pageFollowListQueryKey)).toEqual(
        original
      );
      expect(toast.warn).toHaveBeenCalledWith("이미 언팔로우한 유저에요.");
    });
  });

  it("onError: status가 409가 아니면 일반 실패 toast.warn을 호출합니다.", async () => {
    const listType = "followers";
    const pageFollowListQueryKey = makePageFollowListKey(listType);

    const original: InfiniteProfileList = {
      pages: [[{ uid, isFollow: true, followersCount: 10 } as FollowUserData]],
      pageParams: []
    };
    queryClient.setQueryData(pageFollowListQueryKey, original);

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
});
