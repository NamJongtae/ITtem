import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useDeleteWishMutate from "@/domains/product/detail/hooks/mutations/useDeleteWishMutate";
import deleteProductWish from "@/domains/product/detail/api/deleteProductWish";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/domains/product/detail/api/deleteProductWish");

describe("useDeleteWishMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockDeleteWish = deleteProductWish as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  const productKey = queryKeys.product.detail("123").queryKey;
  const myProfileKey = queryKeys.profile.my.queryKey;
  const myWishListKey = queryKeys.profile.my._ctx.wish({ limit: 10 }).queryKey;

  const fakeProduct = {
    _id: "123",
    isWish: true,
    wishCount: 1
  };

  const fakeMyProfile = {
    uid: "user123",
    wishCount: 1
  };

  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(productKey, fakeProduct);
    queryClient.setQueryData(myProfileKey, fakeMyProfile);
    queryClient.setQueryData(myWishListKey, { pages: [], pageParams: [] });

    mockUseParams.mockReturnValue({ productId: "123" });
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "user123" } })
    );

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 product 캐시 cancelQueries, setQueryData가 실행됩니다. (isWish=false, wishCount-1)", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useDeleteWishMutate(), { wrapper });

    act(() => {
      result.current.deleteWishMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: productKey });

      expect(setQueryDataSpy).toHaveBeenCalledWith(productKey, {
        _id: "123",
        isWish: false,
        wishCount: 0
      });
    });
  });

  it("mutate가 성공하면 onSettled에서 myProfile, myWishList invalidateQueries가 호출됩니다.", async () => {
    mockDeleteWish.mockResolvedValue({ data: { message: "찜 취소 완료" } });

    const { result } = renderHook(() => useDeleteWishMutate(), { wrapper });

    act(() => {
      result.current.deleteWishMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myWishListKey });
    });
  });

  it("onError 발생 시 product 캐시가 이전 데이터로 rollback되고, onSettled invalidateQueries가 호출됩니다.", async () => {
    mockDeleteWish.mockRejectedValue({
      response: { data: { message: "찜 취소 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useDeleteWishMutate(), { wrapper });

    act(() => {
      result.current.deleteWishMutate();
    });

    await waitFor(() => {
      // ✅ rollback 확인
      expect(queryClient.getQueryData(productKey)).toEqual(fakeProduct);

      // ✅ onSettled invalidate 확인
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myWishListKey });
    });
  });

  it("이미 isWish=false 상태면 optimistic update(setQueryData)를 하지 않습니다.", async () => {
    queryClient.setQueryData(productKey, {
      _id: "123",
      isWish: false,
      wishCount: 0
    });

    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useDeleteWishMutate(), { wrapper });

    act(() => {
      result.current.deleteWishMutate();
    });
  });
});
