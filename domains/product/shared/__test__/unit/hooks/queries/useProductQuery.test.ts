import { renderHook } from "@testing-library/react";
import useProductQuery from "@/domains/product/shared/hooks/queries/useProductQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseQuery: jest.fn()
  };
});

jest.mock("next/navigation", () => ({
  useParams: jest.fn()
}));

describe("useProductQuery 훅 테스트", () => {
  const mockUseSuspenseQuery = useSuspenseQuery as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  const wrapper = createQueryClientWrapper().Wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("productId 인자를 전달한 경우 해당 id로 queryKey, queryFn를 구성하고 데이터를 반환합니다.", () => {
    const productId = "product123";
    const mockData = { id: productId, name: "테스트 상품" };
    mockUseParams.mockReturnValue({});

    const queryKeyConfig = queryKeys.product.detail(productId);
    mockUseSuspenseQuery.mockImplementation((options) => {
      options.queryKey = queryKeyConfig.queryKey;
      options.queryFn = queryKeyConfig.queryFn;
      return {
        data: mockData,
        isLoading: false,
        error: null
      };
    });

    const { result } = renderHook(() => useProductQuery(productId), {
      wrapper
    });

    expect(mockUseSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        queryFn: queryKeyConfig.queryFn,
        staleTime: 5 * 1000,
        refetchOnMount: true
      })
    );

    expect(result.current.productData).toEqual(mockData);
    expect(result.current.productLoading).toBe(false);
    expect(result.current.productError).toBeNull();
  });

  it("productId 인자가 없는 경우 params.productId로 queryKey, queryFn를 구성하고 데이터를 반환합니다.", () => {
    const productId = "product-from-params";
    const mockData = { id: productId, name: "상품 A" };

    mockUseParams.mockReturnValue({ productId });
    const queryKeyConfig = queryKeys.product.detail(productId);
    mockUseSuspenseQuery.mockImplementation((options) => {
      options.queryKey = queryKeyConfig.queryKey;
      options.queryFn = queryKeyConfig.queryFn;
      return {
        data: mockData,
        isLoading: false,
        error: null
      };
    });

    const { result } = renderHook(() => useProductQuery(), {
      wrapper
    });

    expect(mockUseSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        queryFn: queryKeyConfig.queryFn,
        staleTime: 5 * 1000,
        refetchOnMount: true
      })
    );
    expect(result.current.productData).toEqual(mockData);
  });

  it("에러가 발생하면 productError에 값이 반환됩니다.", () => {
    const productId = "product123";
    const error = new Error("상품 조회 실패");

    mockUseParams.mockReturnValue({ productId });
    mockUseSuspenseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error
    });

    const { result } = renderHook(() => useProductQuery(), {
      wrapper
    });

    expect(result.current.productData).toBeUndefined();
    expect(result.current.productError).toBe(error);
  });
});
