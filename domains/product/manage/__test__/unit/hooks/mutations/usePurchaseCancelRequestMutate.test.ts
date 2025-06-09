import { renderHook, act, waitFor } from "@testing-library/react";
import usePurchaseCancelRequestMutate from "@/domains/product/manage/hooks/mutations/usePurchaseCancelRequestMutate";
import purchaseCancelRequest from "@/domains/product/manage/api/purchaseCancelRequest";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";

jest.mock("@/domains/product/manage/api/purchaseCancelRequest");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");

describe("usePurchaseCancelRequestMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mockPurchaseCancelRequest = purchaseCancelRequest as jest.Mock;
  const stopLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGlobalLoadingStore.mockReturnValue({
      actions: {
        stopLoading
      }
    });
  });

  const mutationParams = {
    productId: "product123",
    cancelReason: "단순 변심"
  };

  it("onSuccess 시 toast.success, invalidateQueries, stopLoading을 호출합니다.", async () => {
    const mockMessage = "구매 취소 요청 완료";
    mockPurchaseCancelRequest.mockResolvedValue({
      data: { message: mockMessage }
    });

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => usePurchaseCancelRequestMutate(), {
      wrapper
    });

    act(() => {
      result.current.purchaseCancelRequestMutate(mutationParams);
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mockMessage);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: queryKeys.product.manage._def
      });
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러일 경우 toast.warn, stopLoading을 호출합니다.", async () => {
    const error = {
      isAxiosError: true,
      response: { data: { message: "에러 발생" } }
    };
    mockPurchaseCancelRequest.mockRejectedValue(error);

    const { result } = renderHook(() => usePurchaseCancelRequestMutate(), {
      wrapper
    });

    act(() => {
      result.current.purchaseCancelRequestMutate(mutationParams);
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("에러 발생");
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러가 아닐 경우 toast.warn을 호출하지 않습니다.", async () => {
    const error = new Error("일반 에러");
    mockPurchaseCancelRequest.mockRejectedValue(error);

    const { result } = renderHook(() => usePurchaseCancelRequestMutate(), {
      wrapper
    });

    act(() => {
      result.current.purchaseCancelRequestMutate(mutationParams);
    });

    await waitFor(() => {
      expect(toast.warn).not.toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });
});
