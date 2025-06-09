import { renderHook, act, waitFor } from "@testing-library/react";
import useReturnRejectMutate from "@/domains/product/manage/hooks/mutations/useReturnReceiptRejectMutate";
import productReturnReject from "@/domains/product/manage/api/productReturnReject";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";

jest.mock("@/domains/product/manage/api/productReturnReject");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");

describe("useReturnRejectMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mockProductReturnReject = productReturnReject as jest.Mock;
  const stopLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGlobalLoadingStore.mockReturnValue({
      actions: {
        stopLoading
      }
    });
  });

  it("onSuccess 시 toast.success, invalidateQueries, stopLoading을 호출합니다.", async () => {
    const mockMessage = "반품 요청이 거부되었습니다.";
    mockProductReturnReject.mockResolvedValue({
      data: { message: mockMessage }
    });

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useReturnRejectMutate(), { wrapper });

    act(() => {
      result.current.returnRejectMutate({
        productId: "product999",
        rejectReason: "사유 없음"
      });
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
      response: { data: { message: "반품 거부 오류" } }
    };
    mockProductReturnReject.mockRejectedValue(error);

    const { result } = renderHook(() => useReturnRejectMutate(), { wrapper });

    act(() => {
      result.current.returnRejectMutate({
        productId: "product999",
        rejectReason: "사유 없음"
      });
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("반품 거부 오류");
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러가 아닐 경우 toast.warn을 호출하지 않습니다.", async () => {
    const error = new Error("일반 에러");
    mockProductReturnReject.mockRejectedValue(error);

    const { result } = renderHook(() => useReturnRejectMutate(), { wrapper });

    act(() => {
      result.current.returnRejectMutate({
        productId: "product999",
        rejectReason: "사유 없음"
      });
    });

    await waitFor(() => {
      expect(toast.warn).not.toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });
});
