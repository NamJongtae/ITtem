import { renderHook, act, waitFor } from "@testing-library/react";
import useProductReportMutate from "@/domains/product/detail/hooks/mutations/useProductReportMutate";
import reportProduct from "@/domains/product/detail/api/reportProduct";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("next/navigation");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/domains/product/detail/api/reportProduct");

describe("useProductReportMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockReportProduct = reportProduct as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  const productKey = queryKeys.product.detail("123").queryKey;

  const fakeProduct = {
    _id: "123",
    reportUserIds: [],
    reportCount: 0,
    block: false
  };

  const fakeMyUid = "user123";

  let invalidateSpy: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(productKey, fakeProduct);

    mockUseParams.mockReturnValue({ productId: "123" });
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: "user123" })
    );

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 product 캐시에 cancelQueries, setQueryData, toast.success가 호출됩니다.", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useProductReportMutate(), {
      wrapper
    });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: productKey });

      expect(setQueryDataSpy).toHaveBeenCalledWith(productKey, {
        _id: "123",
        reportUserIds: [fakeMyUid],
        reportCount: 1,
        block: false
      });
      expect(toast.success).toHaveBeenCalledWith("해당 상품을 신고했어요.");
    });
  });

  it("mutate가 성공하면 invalidateQueries가 호출됩니다.", async () => {
    mockReportProduct.mockResolvedValue({ data: { message: "신고 성공" } });

    const { result } = renderHook(() => useProductReportMutate(), {
      wrapper
    });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productKey });
    });
  });

  it("onError 발생 시 이전 데이터로 rollback되고, invalidateQueries, toast.warn가 호출됩니다.", async () => {
    mockReportProduct.mockRejectedValue({
      response: { data: { message: "이미 신고한 상품입니다." } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useProductReportMutate(), {
      wrapper
    });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("이미 신고한 상품입니다.");
      const rolledBack = queryClient.getQueryData(productKey);
      expect(rolledBack).toEqual(fakeProduct);
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productKey });
    });
  });

  it("신고 수가 5 이상이면 block이 true로 설정되며, toast.warn가 호출됩니다. ", async () => {
    mockReportProduct.mockResolvedValue({ data: { message: "신고 성공" } });

    const preReportedProduct = {
      _id: "123",
      reportUserIds: ["a", "b", "c", "d"],
      reportCount: 4,
      block: false
    };

    queryClient.setQueryData(productKey, preReportedProduct);

    const { result } = renderHook(() => useProductReportMutate(), {
      wrapper
    });

    await act(async () => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "상품 신고가 누적되어 블라인드 처리되었어요."
      );
      const updatedProduct = queryClient.getQueryData(productKey);
      expect(updatedProduct).toEqual({
        ...preReportedProduct,
        reportUserIds: [...preReportedProduct.reportUserIds, fakeMyUid],
        reportCount: 5,
        block: true
      });
    });
  });
});
