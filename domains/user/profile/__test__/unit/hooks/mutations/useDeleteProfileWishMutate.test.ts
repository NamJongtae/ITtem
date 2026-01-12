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

  const wishQueryKey = queryKeys.profile.my._ctx.wish({ limit: 10 }).queryKey;
  const myProfileKey = queryKeys.profile.my.queryKey;

  const fakeMyProfile: ProfileData = {
    uid: "user1",
    wishCount: 3
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

  let invalidateSpy: jest.SpyInstance;
  let cancelSpy: jest.SpyInstance;
  let setDataSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(myProfileKey, fakeMyProfile);
    queryClient.setQueryData(wishQueryKey, fakeWishList);

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setDataSpy = jest.spyOn(queryClient, "setQueryData");
  });

  it("onMutate에서 cancelQueries + optimistic 업데이트(찜목록 제거, 프로필 wishCount 감소)를 수행합니다.", async () => {
    const { result } = renderHook(() => useDeleteProfileWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.deleteWishMutate(["1", "3"]);
    });

    await waitFor(() => {
      // cancelQueries 2개
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(cancelSpy).toHaveBeenCalledWith({ queryKey: wishQueryKey });

      // 프로필 wishCount 감소 (3 -> 1)
      expect(setDataSpy).toHaveBeenCalledWith(
        myProfileKey,
        expect.objectContaining({
          uid: "user1",
          wishCount: 1
        })
      );

      const updatedProfile = queryClient.getQueryData(
        myProfileKey
      ) as ProfileData;
      expect(updatedProfile.wishCount).toBe(1);

      // 찜 목록에서 1,3 제거 -> 2만 남음
      const updatedWish = queryClient.getQueryData(wishQueryKey) as
        | InfiniteData<ProductData[], unknown>
        | undefined;

      const updatedWishIds = updatedWish?.pages.flat().map((p) => p._id);
      expect(updatedWishIds).toEqual(["2"]);
    });
  });

  it("onSuccess에서 삭제된 상품들의 detail 쿼리를 각각 invalidateQueries 합니다.", async () => {
    mockDeleteWish.mockResolvedValue({ data: { message: "ok" } });

    const { result } = renderHook(() => useDeleteProfileWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.deleteWishMutate(["2", "3"]);
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: queryKeys.product.detail("2").queryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: queryKeys.product.detail("3").queryKey
      });

      expect(toast.success).toHaveBeenCalledWith("찜 목록 삭제에 성공했어요.");
    });
  });

  it("onError 발생 시 프로필/찜목록 캐시를 rollback 하고 toast.warn를 호출합니다.", async () => {
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

      const restoredWishIds = restoredWish?.pages.flat().map((p) => p._id);
      expect(restoredWishIds).toEqual(["1", "2", "3"]);

      expect(toast.warn).toHaveBeenCalledWith("삭제 실패");
    });
  });
});
