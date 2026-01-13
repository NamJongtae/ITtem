import { renderHook, act, waitFor } from "@testing-library/react";
import useProductReportMutate from "@/domains/product/detail/hooks/mutations/useProductReportMutate";
import reportProduct from "@/domains/product/detail/api/reportProduct";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn()
}));

jest.mock("@/domains/product/detail/api/reportProduct");

describe("useProductReportMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const mockReportProduct = reportProduct as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  const productKey = queryKeys.product.detail("123").queryKey;

  const fakeProduct = {
    _id: "123",
    reportCount: 0,
    block: false,
    isReported: false,
    imgData: [{ url: "img" }],
    name: "name"
  };

  const routerReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(productKey, fakeProduct);

    mockUseParams.mockReturnValue({ productId: "123" });
    mockUseRouter.mockReturnValue({ replace: routerReplace });
  });

  it("onMutate에서 cancelQueries, setQueryData가 호출되고(낙관적 업데이트), 성공 시 toast.success + router.replace가 호출됩니다.", async () => {
    mockReportProduct.mockResolvedValueOnce({ data: { message: "신고 성공" } });

    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useProductReportMutate(), { wrapper });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: productKey });
      expect(setQueryDataSpy).toHaveBeenCalledWith(productKey, {
        ...fakeProduct,
        isReported: true,
        reportCount: 1,
        block: false
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("해당 상품을 신고했어요.");
      expect(routerReplace).toHaveBeenCalledWith("/product");
    });
  });

  it("onError 발생 시 이전 데이터로 rollback되고 toast.warn가 호출됩니다.", async () => {
    const axiosError: any = {
      isAxiosError: true,
      response: { data: { message: "이미 신고한 상품입니다." } }
    };
    mockReportProduct.mockRejectedValueOnce(axiosError);

    const { result } = renderHook(() => useProductReportMutate(), { wrapper });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("이미 신고한 상품입니다.");
      const rolledBack = queryClient.getQueryData(productKey);
      expect(rolledBack).toEqual(fakeProduct);
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(routerReplace).not.toHaveBeenCalled();
  });

  it("신고 수가 5가 되면 block이 true로 설정되고, 성공 토스트와 router.replace가 호출됩니다.", async () => {
    mockReportProduct.mockResolvedValueOnce({ data: { message: "신고 성공" } });

    const preReportedProduct = {
      ...fakeProduct,
      reportCount: 4,
      block: false,
      isReported: false
    };

    queryClient.setQueryData(productKey, preReportedProduct);

    const { result } = renderHook(() => useProductReportMutate(), { wrapper });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      const updatedProduct = queryClient.getQueryData(productKey);
      expect(updatedProduct).toEqual({
        ...preReportedProduct,
        isReported: true,
        reportCount: 5,
        block: true
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "상품 신고가 누적되어 블라인드 처리되었어요."
      );
      expect(routerReplace).toHaveBeenCalledWith("/product");
    });
  });

  it("이미 isReported=true면 낙관적 업데이트/토스트/라우팅이 발생하지 않습니다.", async () => {
    mockReportProduct.mockResolvedValueOnce({ data: { message: "신고 성공" } });

    queryClient.setQueryData(productKey, {
      ...fakeProduct,
      isReported: true
    });

    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");
    setQueryDataSpy.mockClear();

    const { result } = renderHook(() => useProductReportMutate(), { wrapper });

    act(() => {
      result.current.productReportMutate();
    });

    await waitFor(() => {
      expect(setQueryDataSpy).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(toast.success).not.toHaveBeenCalled();
      expect(routerReplace).not.toHaveBeenCalled();
    });
  });
});
