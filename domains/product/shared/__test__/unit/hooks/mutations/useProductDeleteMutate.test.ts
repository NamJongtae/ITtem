import { renderHook, act, waitFor } from "@testing-library/react";
import useProductDeleteMutate from "@/domains/product/shared/hooks/mutations/useProductDeleteMutate";
import deleteProduct from "@/domains/product/shared/api/deleteProduct";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useRouter, useParams } from "next/navigation";

jest.mock("@/domains/product/shared/api/deleteProduct");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("next/navigation");
jest.mock("@/shared/common/store/globalLogingStore");

describe("useProductDeleteMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockDeleteProduct = deleteProduct as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const startLoading = jest.fn();
  const stopLoading = jest.fn();
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ replace });
    mockUseGlobalLoadingStore.mockReturnValue({
      actions: {
        startLoading,
        stopLoading
      }
    });
  });

  it("onMutate에서 startLoading을 호출합니다.", async () => {
    const { result } = renderHook(() => useProductDeleteMutate(), {
      wrapper
    });

    act(() => {
      result.current.productDeleteMutate();
    });

    await waitFor(() => {
      expect(startLoading).toHaveBeenCalled();
    });
  });

  it("onSuccess에서 productId가 존재할 경우 router.replace, toast.success, stopLoading을 호출합니다.", async () => {
    const message = "삭제 완료";
    mockUseParams.mockReturnValue({ productId: "product123" });
    mockDeleteProduct.mockResolvedValue({ data: { message } });

    const { result } = renderHook(() => useProductDeleteMutate(), {
      wrapper
    });

    act(() => {
      result.current.productDeleteMutate();
    });

    await waitFor(() => {
      expect(startLoading).toHaveBeenCalled();
      expect(mockDeleteProduct).toHaveBeenCalledWith("product123");
      expect(replace).toHaveBeenCalledWith("/product");
      expect(toast.success).toHaveBeenCalledWith(message);
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("productId가 undefined인 경우 invalidateQueries을 호출합니다.", async () => {
    const message = "삭제 완료";
    mockUseParams.mockReturnValue(undefined);
    mockDeleteProduct.mockResolvedValue({ data: { message } });

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useProductDeleteMutate(undefined), {
      wrapper
    });

    act(() => {
      result.current.productDeleteMutate();
    });

    await waitFor(() => {
      expect(mockDeleteProduct).toHaveBeenCalledWith(undefined);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: queryKeys.product._def
      });
      expect(toast.success).toHaveBeenCalledWith(message);
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("onError에서 toast.warn, stopLoading을 호출합니다.", async () => {
    const error = {
      isAxiosError: true,
      response: {
        data: {
          message: "삭제 실패"
        }
      }
    };
    mockUseParams.mockReturnValue({ productId: "abc123" });
    mockDeleteProduct.mockRejectedValue(error);

    const { result } = renderHook(() => useProductDeleteMutate(), {
      wrapper
    });

    act(() => {
      result.current.productDeleteMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("삭제 실패");
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  it("에러가 일반 Error인 경우 toast.warn을 호출하지 않습니다.", async () => {
    const error = new Error("예외 발생");
    mockUseParams.mockReturnValue({ productId: "abc123" });
    mockDeleteProduct.mockRejectedValue(error);

    const { result } = renderHook(() => useProductDeleteMutate(), {
      wrapper
    });

    act(() => {
      result.current.productDeleteMutate();
    });

    await waitFor(() => {
      expect(toast.warn).not.toHaveBeenCalled();
      expect(stopLoading).toHaveBeenCalled();
    });
  });
});
