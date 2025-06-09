import { renderHook, act, waitFor } from "@testing-library/react";
import useReturnReceiptComfirmationMutate from "@/domains/product/manage/hooks/mutations/useReturnReceiptComfirmationMutate";
import productReturnReceiptConfirmation from "@/domains/product/manage/api/productReturnReceiptConfirmation";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";

jest.mock("@/domains/product/manage/api/productReturnReceiptConfirmation");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");

describe("useReturnReceiptComfirmationMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mockProductReturnReceiptConfirmation =
    productReturnReceiptConfirmation as jest.Mock;
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
    const mockMessage = "반품 상품 인수 완료";
    mockProductReturnReceiptConfirmation.mockResolvedValue({
      data: { message: mockMessage }
    });

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useReturnReceiptComfirmationMutate(), {
      wrapper
    });

    act(() => {
      result.current.productReturnReceiptConfirmationMutate("product123");
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
      response: { data: { message: "반품 상품 인수 오류" } }
    };
    mockProductReturnReceiptConfirmation.mockRejectedValue(error);

    const { result } = renderHook(() => useReturnReceiptComfirmationMutate(), {
      wrapper
    });

    act(() => {
      result.current.productReturnReceiptConfirmationMutate("product789");
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("반품 상품 인수 오류");
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러가 아닐 경우 toast.warn을 호출하지 않습니다.", async () => {
    const error = new Error("일반 에러");
    mockProductReturnReceiptConfirmation.mockRejectedValue(error);

    const { result } = renderHook(() => useReturnReceiptComfirmationMutate(), {
      wrapper
    });

    act(() => {
      result.current.productReturnReceiptConfirmationMutate("product123");
    });

    await waitFor(() => {
      expect(toast.warn).not.toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });
});
