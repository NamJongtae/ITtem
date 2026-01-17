import { renderHook, act, waitFor } from "@testing-library/react";
import followUser from "@/domains/user/shared/api/followUser";
import useUserProfileFollowInListMutate from "@/domains/user/profile/hooks/mutations/useUserProfileFollowInListMutate";
import { toast } from "react-toastify";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import type { InfiniteData } from "@tanstack/react-query";
import type { FollowUserData } from "@/domains/user/profile/types/profileTypes";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";

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

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;

describe("useUserProfileFollowInListMutate", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as unknown as jest.Mock;

  const myUid = "me";
  const targetUid = "target";
  const pageUid = "pageUser";
  const limit = 10;

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

  const basePageList = (): InfiniteFollowList => {
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

    return {
      pages: [[targetItem, meItem]],
      pageParams: [null]
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear(); // ✅ 테스트 격리(캐시 공유 방지)

    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );

    mockUseParams.mockReturnValue({ uid: pageUid });
  });

  it("onMutate: pageFollowListQueryKey cancelQueries 후 타겟 isFollow=true & followersCount+1 / 내 followingsCount+1 optimistic 업데이트", async () => {
    queryClient.setQueryData(followersPageListKey, basePageList());

    const cancelSpy = jest.spyOn(queryClient, "cancelQueries");

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

      const updated = queryClient.getQueryData(
        followersPageListKey
      ) as InfiniteFollowList;

      const target = updated.pages[0].find((u) => u.uid === targetUid)!;
      const me = updated.pages[0].find((u) => u.uid === myUid)!;

      expect(target.isFollow).toBe(true);
      expect(target.followersCount).toBe(4);

      expect(me.followingsCount).toBe(11);
    });
  });

  it("onError: optimistic 롤백 + status 409이면 toast.warn('이미 팔로우한 유저에요.')", async () => {
    mockFollowUser.mockRejectedValue({ status: 409, message: "dup" });

    const original = basePageList();
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
      const rolledBack = queryClient.getQueryData(
        followingsPageListKey
      ) as InfiniteFollowList;

      expect(rolledBack).toEqual(original);
      expect(toast.warn).toHaveBeenCalledWith("이미 팔로우한 유저에요.");
    });
  });

  it("onError: status 409가 아니면 일반 실패 toast.warn 호출", async () => {
    mockFollowUser.mockRejectedValue({ status: 500, message: "fail" });

    queryClient.setQueryData(followersPageListKey, basePageList());

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
});
