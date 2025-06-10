import { renderHook, act, waitFor } from "@testing-library/react";
import useDeleteProfileWishMutate from "@/domains/user/profile/hooks/mutations/useDeleteProfileWishMutate";
import deleteWishlistProductData from "@/domains/user/profile/api/deleteWishlistProductData";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProfileData } from "@/domains/user/profile/types/profileTypes";
import type { ProductData } from "@/domains/product/shared/types/productTypes";
import type { InfiniteData } from "@tanstack/react-query";

jest.mock("@/domains/user/profile/api/deleteWishlistProductData");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));

describe("useDeleteProfileWishMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockDeleteWish = deleteWishlistProductData as jest.Mock;

  const wishQueryKey = queryKeys.profile.my._ctx.wish._def;
  const myProfileKey = queryKeys.profile.my.queryKey;
  const detailQueryKey = queryKeys.product.detail._def;

  const fakeMyProfile: ProfileData = {
    uid: "user1",
    wishProductIds: ["1", "2", "3"]
  } as ProfileData;

  const fakeWishList: InfiniteData<ProductData[], unknown> = {
    pages: [
      [
        { _id: "1", name: "상품1" } as ProductData,
        { _id: "2", name: "상품2" } as ProductData
      ],
      [{ _id: "3", name: "상품3" } as ProductData]
    ],
    pageParams: []
  };

  let invalidateSpy: unknown;
  let cancelSpy: unknown;
  let setDataSpy: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(myProfileKey, fakeMyProfile);
    queryClient.setQueryData(wishQueryKey, fakeWishList);

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
  });

  it("onMutate에서 cancelQueries와 setQueryData로 optimistic 업데이트를 수행합니다.", async () => {
    const { result } = renderHook(() => useDeleteProfileWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.deleteWishMutate(["1", "3"]);
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: wishQueryKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(setDataSpy).toHaveBeenCalledWith(myProfileKey, {
        uid: "user1",
        wishProductIds: ["2"]
      });

      const updatedProfile = queryClient.getQueryData(myProfileKey);
      expect(updatedProfile).toEqual({
        uid: "user1",
        wishProductIds: ["2"]
      });

      const updatedWish = queryClient.getQueryData(wishQueryKey) as
        | InfiniteData<ProductData[], unknown>
        | undefined;
      const updatedWishIds = updatedWish?.pages
        .flat()
        .map((p: ProductData) => p._id);
      expect(updatedWishIds).toEqual(["2"]);

      expect(toast.success).toHaveBeenCalledWith("찜 목록 삭제에 성공했어요.");
    });
  });

  it("onSuccess에서 productDetail 캐시 invalidateQueries를 호출합니다.", async () => {
    mockDeleteWish.mockResolvedValue({ data: { message: "ok" } });

    const { result } = renderHook(() => useDeleteProfileWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.deleteWishMutate(["2"]);
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: detailQueryKey
      });
    });
  });

  it("onError 발생 시 setQueryData를 호출하여 캐시 데이터 rollback 하고, toast.warn를 호출합니다.", async () => {
    mockDeleteWish.mockRejectedValue({
      response: { data: { message: "삭제 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useDeleteProfileWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.deleteWishMutate(["2"]);
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(myProfileKey)).toEqual(fakeMyProfile);

      const restoredWish = queryClient.getQueryData(wishQueryKey) as
        | InfiniteData<ProductData[], unknown>
        | undefined;
      const restoredWishIds = restoredWish?.pages
        .flat()
        .map((p: ProductData) => p._id);

      expect(restoredWishIds).toEqual(["1", "2", "3"]);

      expect(toast.warn).toHaveBeenCalledWith("삭제 실패");
    });
  });
});
