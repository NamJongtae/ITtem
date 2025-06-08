import { renderHook, act, waitFor } from "@testing-library/react";
import usePurchaseProductMutate from "@/domains/product/detail/hooks/mutations/usePurchaseProductMutate";
import purchaseProduct from "@/domains/product/detail/api/purchaseProduct";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("next/navigation");
jest.mock("@/shared/common/store/globalLogingStore");
jest.mock("@/domains/product/detail/api/purchaseProduct");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));

describe("usePurchaseProductMutate 훅 테스트", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();

  const mockPurchaseProduct = purchaseProduct as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseLoadingStore = useGlobalLoadingStore as unknown as jest.Mock;

  const startLoading = jest.fn();
  const stopLoading = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ productId: "123" });

    mockUseRouter.mockReturnValue({ push: mockRouterPush });

    mockUseLoadingStore.mockReturnValue({
      actions: {
        startLoading,
        stopLoading
      }
    });
  });

  it("onMutate에서 startLoading이 호출됩니다.", async () => {
    const { result } = renderHook(() => usePurchaseProductMutate(), {
      wrapper
    });

    act(() => {
      result.current.purchaseProductMutate();
    });

    await waitFor(() => {
      expect(startLoading).toHaveBeenCalled();
    });
  });

  it("mutate 성공 시 stopLoading, router.push, toast.success가 호출됩니다.", async () => {
    mockPurchaseProduct.mockResolvedValue({
      data: { message: "상품 구매에 성공했어요." }
    });

    const { result } = renderHook(() => usePurchaseProductMutate(), {
      wrapper
    });

    act(() => {
      result.current.purchaseProductMutate();
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/product/manage?menu=purchase"
      );
      expect(stopLoading).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("상품 구매에 성공했어요.");
    });
  });

  it("에러 발생 시 stopLoading, toast.warn이 호출됩니다.", async () => {
    mockPurchaseProduct.mockRejectedValue({
      isAxiosError: true,
      response: { data: { message: "상품 구매에 실패했어요." } }
    });

    const { result } = renderHook(() => usePurchaseProductMutate(), {
      wrapper
    });

    act(() => {
      result.current.purchaseProductMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("상품 구매에 실패했어요.");
    });
  });
});
