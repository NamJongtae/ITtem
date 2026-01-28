import { renderHook } from "@testing-library/react";
import useRecommendProductInfiniteQuery from "@/domains/product/shared/hooks/queries/useRecommendProductInfiniteQuery";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

describe("useRecommendProductInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const wrapper = createQueryClientWrapper().Wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queryKey, queryFn, initialPageParam을 구성하고 데이터를 반환합니다.", () => {
    const limit = 8;
    const nextCursor = "2024-04-01";

    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      createdAt: `2024-04-${(i + 1).toString().padStart(2, "0")}`
    }));

    let getNextPageParamFn: any;
    let initialPageParamValue: any;

    const queryKeyConfig = queryKeys.product.recommend(limit);

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      initialPageParamValue = options.initialPageParam;

      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(
      () => useRecommendProductInfiniteQuery({ limit, nextCursor }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        staleTime: 60 * 1000,
        initialPageParam: nextCursor
      })
    );

    expect(initialPageParamValue).toBe(nextCursor);
    expect(getNextPageParamFn(mockData)).toBe("2024-04-08");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("nextCursor가 null이면 initialPageParam이 null입니다.", () => {
    const limit = 8;
    const nextCursor = null;

    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      createdAt: `2024-04-${(i + 1).toString().padStart(2, "0")}`
    }));

    let initialPageParamValue: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      initialPageParamValue = options.initialPageParam;
      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(() => useRecommendProductInfiniteQuery({ limit, nextCursor }), {
      wrapper
    });

    expect(initialPageParamValue).toBeNull();
  });

  it("마지막 페이지가 limit보다 작을 경우 getNextPageParam이 undefined를 반환합니다.", () => {
    const limit = 8;
    const nextCursor = "2024-04-01";

    const mockData = [
      { id: 1, createdAt: "2024-04-01" },
      { id: 2, createdAt: "2024-04-02" }
    ];

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(() => useRecommendProductInfiniteQuery({ limit, nextCursor }), {
      wrapper
    });

    expect(getNextPageParamFn(mockData)).toBeUndefined();
  });

  it("에러가 발생한 경우 error를 반환합니다.", () => {
    const error = new Error("추천 상품 에러 발생");
    const limit = 8;
    const nextCursor = "2024-04-01";

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(
      () => useRecommendProductInfiniteQuery({ limit, nextCursor }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
