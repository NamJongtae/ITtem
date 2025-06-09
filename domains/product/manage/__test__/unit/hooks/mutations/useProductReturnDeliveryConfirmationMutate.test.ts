import { renderHook, act, waitFor } from "@testing-library/react";
import useProductReturnDeliveryConfirmationMutate from "@/domains/product/manage/hooks/mutations/useProductReturnDeliveryConfirmationMutate";
import productReturnDeliveryConfirmation from "@/domains/product/manage/api/productReturnDeliveryConfirmation";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";

jest.mock("@/domains/product/manage/api/productReturnDeliveryConfirmation");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");

describe("useProductReturnDeliveryConfirmationMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mockProductReturnDeliveryConfirmation =
    productReturnDeliveryConfirmation as jest.Mock;
  const startLoading = jest.fn();
  const stopLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGlobalLoadingStore.mockReturnValue({
      actions: {
        startLoading,
        stopLoading
      }
    });
  });

  it("onMutate에서 startLoading이 호출됩니다.", async () => {
    const { result } = renderHook(
      () => useProductReturnDeliveryConfirmationMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productReturnDeliveryConfirmationMutate("product123");
    });

    await waitFor(() => {
      expect(startLoading).toHaveBeenCalled();
    });
  });

  it("onSuccess 시 toast.success, invalidateQueries, stopLoading을 호출합니다.", async () => {
    const mockMessage = "반품 배송 확인 완료";
    mockProductReturnDeliveryConfirmation.mockResolvedValue({
      data: { message: mockMessage }
    });

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(
      () => useProductReturnDeliveryConfirmationMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productReturnDeliveryConfirmationMutate("product123");
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mockMessage);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: queryKeys.product.manage._def
      });
      expect(startLoading).toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러일 경우 toast.warn, stopLoading을 호출합니다.", async () => {
    const error = {
      isAxiosError: true,
      response: { data: { message: "에러 발생" } }
    };
    mockProductReturnDeliveryConfirmation.mockRejectedValue(error);

    const { result } = renderHook(
      () => useProductReturnDeliveryConfirmationMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productReturnDeliveryConfirmationMutate("product123");
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("에러 발생");
      expect(startLoading).toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러가 아닐 경우 toast.warn을 호출하지 않습니다.", async () => {
    const error = new Error("일반 에러");
    mockProductReturnDeliveryConfirmation.mockRejectedValue(error);

    const { result } = renderHook(
      () => useProductReturnDeliveryConfirmationMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productReturnDeliveryConfirmationMutate("product123");
    });

    await waitFor(() => {
      expect(toast.warn).not.toHaveBeenCalled();
      expect(startLoading).toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });
});
