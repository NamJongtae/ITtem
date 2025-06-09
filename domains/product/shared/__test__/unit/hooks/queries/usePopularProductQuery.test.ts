import { renderHook } from "@testing-library/react";
import usePopularProductQuery from "@/domains/product/shared/hooks/queries/usePopularProductQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseQuery: jest.fn()
  };
});

describe("usePopularProductQuery 훅 테스트", () => {
  const mockUseSuspenseQuery = useSuspenseQuery as jest.Mock;
  const wrapper = createQueryClientWrapper().Wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queryKey와 queryFn이 구성되고, 데이터를 반환합니다.", () => {
    const mockData = [
      { id: 1, name: "인기 상품 1" },
      { id: 2, name: "인기 상품 2" }
    ];

    mockUseSuspenseQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => usePopularProductQuery(), {
      wrapper
    });

    expect(mockUseSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeys.product.popular.queryKey,
        queryFn: queryKeys.product.popular.queryFn,
        staleTime: 60 * 1000
      })
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("에러가 발생하면 error를 반환합니다.", () => {
    const mockError = new Error("API 에러 발생");

    mockUseSuspenseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError
    });

    const { result } = renderHook(() => usePopularProductQuery(), {
      wrapper
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.data).toBeUndefined();
  });
});
