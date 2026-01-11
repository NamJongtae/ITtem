import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useProductDetailUnfollowMutate from "@/domains/product/detail/hooks/mutations/useProductDetailUnFollowMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useParams: jest.fn()
}));

jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/domains/user/shared/api/unfollowUser");

type FetchError = {
  status: number;
  message: string;
};

describe("useProductDetailUnFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const mockUnfollowUser = unfollowUser as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as unknown as jest.Mock;

  const productId = "123";
  const myUid = "user123";
  const targetUid = "targetUser123";

  const productQueryKey = queryKeys.product.detail(productId).queryKey;

  // ✅ 훅 내부와 동일한 queryKey 구성
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  const userProfileQueryKey = queryKeys.profile.user(targetUid).queryKey;
  const userFollowersQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followers({
      uid: targetUid,
      limit: 10
    }).queryKey;
  const userFollowingsQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followings({
      uid: targetUid,
      limit: 10
    }).queryKey;

  const fakeProduct = {
    _id: productId,
    auth: {
      isFollow: true
    }
  };

  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(productQueryKey, fakeProduct);

    mockUseParams.mockReturnValue({ productId });
    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 product 캐시 cancelQueries 후 auth.isFollow를 false로 optimistic 업데이트합니다.", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({
        queryKey: productQueryKey
      });

      const updatedProduct = queryClient.getQueryData(productQueryKey) as any;
      expect(updatedProduct.auth.isFollow).toBe(false);
    });
  });

  it("onError에서 product 캐시를 롤백하고, status 409이면 toast.warn(이미 언팔로우) 호출", async () => {
    const err: FetchError = { status: 409, message: "dup" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {
      // ✅ 롤백: 원래 데이터로 복구
      expect(queryClient.getQueryData(productQueryKey)).toEqual(fakeProduct);

      expect(toast.warn).toHaveBeenCalledWith("이미 언팔로우한 유저 입니다.");
    });
  });

  it("onError에서 status가 409가 아니면 일반 실패 toast.warn 호출", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {

      expect(toast.warn).toHaveBeenCalledWith(
        "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 myProfile/userProfile/myFollowings/userFollowers/userFollowings 를 invalidateQueries 합니다.", async () => {
    mockUnfollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate(targetUid),
      { wrapper }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: myProfileQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: userProfileQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: myFollowingsQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: userFollowersQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: userFollowingsQueryKey
      });
    });
  });
});
