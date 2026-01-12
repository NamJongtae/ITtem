import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAddWishMutate from "@/domains/product/detail/hooks/mutations/useAddWishMutate";
import addProductWish from "@/domains/product/detail/api/addProductWish";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import type { InfiniteData } from "@tanstack/react-query";
import type { WishlistProductData } from "@/domains/user/profile/types/profileTypes";

jest.mock("next/navigation");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/domains/product/detail/api/addProductWish");

describe("useAddWishMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockAddWish = addProductWish as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  const productKey = queryKeys.product.detail("123").queryKey;
  const myProfileKey = queryKeys.profile.my.queryKey;
  const myWishListKey = queryKeys.profile.my._ctx.wish({ limit: 10 }).queryKey;

  const fakeProduct = {
    _id: "123",
    isWish: false,
    wishCount: 0,
    name: "상품명",
    price: 1000,
    imgData: [{ url: "img", name: "img" }],
    createdAt: "2026-01-01T00:00:00.000Z",
    location: "서울"
  };

  const fakeMyProfile = {
    uid: "user123",
    wishCount: 0
  };

  const emptyWishList: InfiniteData<WishlistProductData[]> = {
    pages: [[]],
    pageParams: [null]
  };

  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(productKey, fakeProduct);
    queryClient.setQueryData(myProfileKey, fakeMyProfile);
    queryClient.setQueryData(myWishListKey, emptyWishList);

    mockUseParams.mockReturnValue({ productId: "123" });
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "user123" } })
    );

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 product 캐시 optimistic: isWish=true, wishCount+1", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useAddWishMutate(), { wrapper });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: productKey });
      expect(cancelQueriesSpy).toHaveBeenCalledWith({
        queryKey: myWishListKey
      });

      expect(setQueryDataSpy).toHaveBeenCalledWith(productKey, {
        ...fakeProduct,
        isWish: true,
        wishCount: 1
      });
    });
  });

  it("onMutate에서 wishlist 캐시 optimistic: 첫 페이지 맨 앞에 추가", async () => {
    const { result } = renderHook(() => useAddWishMutate(), { wrapper });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      const updated = queryClient.getQueryData(myWishListKey) as
        | InfiniteData<WishlistProductData[]>
        | undefined;

      expect(updated).toBeTruthy();
      expect(updated!.pages[0][0]).toEqual(
        expect.objectContaining({
          _id: "123",
          name: "상품명",
          price: 1000,
          location: "서울"
        })
      );
    });
  });

  it("mutate가 성공/실패 여부와 무관하게 onSettled에서 myProfile, myWishList invalidateQueries가 호출됩니다.", async () => {
    mockAddWish.mockResolvedValue({ data: { message: "찜 완료" } });

    const { result } = renderHook(() => useAddWishMutate(), { wrapper });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myWishListKey });
    });
  });

  it("onError 발생 시 product/wishlist 캐시가 이전 데이터로 rollback 됩니다.", async () => {
    mockAddWish.mockRejectedValue({
      response: { data: { message: "찜 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useAddWishMutate(), { wrapper });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(productKey)).toEqual(fakeProduct);
      expect(queryClient.getQueryData(myWishListKey)).toEqual(emptyWishList);

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myWishListKey });
    });
  });

  it("이미 isWish=true 상태면 optimistic update를 하지 않습니다. (product/wishlist setQueryData 호출 X)", async () => {
    queryClient.setQueryData(productKey, { ...fakeProduct, isWish: true });

    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useAddWishMutate(), { wrapper });

    act(() => {
      result.current.addWishMutate();
    });
  });
});
