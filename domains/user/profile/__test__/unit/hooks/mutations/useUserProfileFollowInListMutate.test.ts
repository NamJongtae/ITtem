// useUserProfileFollowInListMutate.test.ts
import { renderHook, act, waitFor } from "@testing-library/react";
import followUser from "@/domains/user/shared/api/followUser";
import useUserProfileFollowInListMutate from "@/domains/user/profile/hooks/mutations/useUserProfileFollowInListMutate";
import { toast } from "react-toastify";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import type { InfiniteData } from "@tanstack/react-query";
import type { FollowUserData } from "@/domains/user/profile/types/profileTypes";

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
jest.mock("next/navigation", () => ({
  useParams: jest.fn()
}));

import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;

describe("useUserProfileFollowInListMutate", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;

  const myUid = "me";
  const targetUid = "target";
  const pageUid = "pageUser";

  const limit = 10;

  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit
  }).queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(targetUid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followers({ uid: targetUid, limit }).queryKey;
  const targetFollowingsQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followings({ uid: targetUid, limit }).queryKey;

  const followersPageListKey = queryKeys.profile.user(pageUid)._ctx.followers({
    uid: pageUid,
    limit
  }).queryKey;

  const followingsPageListKey = queryKeys.profile
    .user(pageUid)
    ._ctx.followings({
      uid: pageUid,
      limit
    }).queryKey;

  const basePageList = (
    listType: "followers" | "followings"
  ): InfiniteFollowList => {
    const targetItem: FollowUserData = {
      uid: targetUid,
      nickname: "t",
      profileImg: "",
      productIds: [],
      reviewPercentage: 0,
      isFollow: false,
      followersCount: 3,
      followingsCount: 7
    };

    const meItem: FollowUserData = {
      uid: myUid,
      nickname: "me",
      profileImg: "",
      productIds: [],
      reviewPercentage: 0,
      isFollow: false,
      followersCount: 1,
      followingsCount: 10
    };

    // 리스트가 followers든 followings든, 훅 로직은 "페이지 리스트"만 수정하니 구조만 맞추면 됨
    return {
      pages: [[targetItem, meItem]],
      pageParams: [null]
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // authStore selector mock
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { uid: myUid } })
    );

    // next params mock
    (useParams as jest.Mock).mockReturnValue({ uid: pageUid });
  });

  it("onMutate: pageFollowListQueryKey cancelQueries 후, 타겟 isFollow=true & followersCount+1 / 내 followingsCount+1 로 optimistic 업데이트", async () => {
    queryClient.setQueryData(followersPageListKey, basePageList("followers"));

    const cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    const setSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(
      () =>
        useUserProfileFollowInListMutate({
          uid: targetUid,
          listType: "followers"
        }),
      { wrapper }
    );

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: followersPageListKey
      });

      // setQueryData가 호출되었는지 (업데이트된 payload까지 확인)
      const updated = queryClient.getQueryData(
        followersPageListKey
      ) as InfiniteFollowList;
      expect(updated.pages[0][0].uid).toBe(targetUid);
      expect(updated.pages[0][0].isFollow).toBe(true);
      expect(updated.pages[0][0].followersCount).toBe(4); // 3 + 1

      expect(updated.pages[0][1].uid).toBe(myUid);
      expect(updated.pages[0][1].followingsCount).toBe(11); // 10 + 1

      expect(setSpy).toHaveBeenCalled(); // 최소 호출 확인
    });
  });

  it("onError: optimistic 롤백 + isFetchError(409)일 때 toast.warn('이미 팔로우한 유저에요.')", async () => {
    // isFetchError가 true가 되려면 훅이 기대하는 FetchError 형태로 reject 해야 함
    mockFollowUser.mockRejectedValue({ status: 409, message: "dup" });

    const original = basePageList("followings");
    queryClient.setQueryData(followingsPageListKey, original);

    const { result } = renderHook(
      () =>
        useUserProfileFollowInListMutate({
          uid: targetUid,
          listType: "followings"
        }),
      { wrapper }
    );

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      // rollback 되었는지
      const rolledBack = queryClient.getQueryData(
        followingsPageListKey
      ) as InfiniteFollowList;
      expect(rolledBack).toEqual(original);

      expect(toast.warn).toHaveBeenCalledWith("이미 팔로우한 유저에요.");
    });
  });

  it("onError: isFetchError(409이외)일 때 toast.warn('유저 팔로우에 실패했어요...')", async () => {
    mockFollowUser.mockRejectedValue({ status: 500, message: "fail" });

    queryClient.setQueryData(followersPageListKey, basePageList("followers"));

    const { result } = renderHook(
      () =>
        useUserProfileFollowInListMutate({
          uid: targetUid,
          listType: "followers"
        }),
      { wrapper }
    );

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(
        "유저 팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });

  it("onSettled: myProfile/myFollowings/targetProfile/targetFollowers/targetFollowings invalidateQueries 호출", async () => {
    mockFollowUser.mockResolvedValue({ ok: true });

    queryClient.setQueryData(followersPageListKey, basePageList("followers"));

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(
      () =>
        useUserProfileFollowInListMutate({
          uid: targetUid,
          listType: "followers"
        }),
      { wrapper }
    );

    act(() => {
      result.current.userFollowMutate();
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
