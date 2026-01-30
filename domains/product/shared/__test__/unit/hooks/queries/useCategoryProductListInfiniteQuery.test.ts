import { renderHook } from "@testing-library/react";
import useCategoryProductListInfiniteQuery from "@/domains/product/shared/hooks/queries/useCategoryProductListInfiniteQuery";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import useLocationStore from "@/shared/common/store/locationStore";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return { ...original, useSuspenseInfiniteQuery: jest.fn() };
});

jest.mock("@/shared/common/store/locationStore");

jest.mock("@/shared/common/query-keys/queryKeys", () => ({
  queryKeys: {
    product: {
      category: jest.fn()
    }
  }
}));

describe("useCategoryProductListInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const mockUseLocationStore = useLocationStore as unknown as jest.Mock;
  const mockProductCategoryKey = queryKeys.product
    .category as unknown as jest.Mock;

  const wrapper = createQueryClientWrapper().Wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("category와 location가 있는 경우 해당 값으로 queryKey, queryFn를 구성하고 데이터를 반환합니다.", () => {
    const location = "서울";
    const limit = 10;
    const category = ProductCategory.전체;

    mockUseLocationStore.mockImplementation((selector) =>
      selector({ location })
    );

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      createdAt: `2024-04-${(i + 1).toString().padStart(2, "0")}`
    }));

    const fixedQueryKey = [
      "product",
      "category",
      { category, location, limit }
    ];
    const fixedQueryFn = jest.fn();

    mockProductCategoryKey.mockReturnValue({
      queryKey: fixedQueryKey,
      queryFn: fixedQueryFn
    });

    let capturedOptions: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      capturedOptions = options;
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
      () =>
        useCategoryProductListInfiniteQuery({
          nextCursor: null,
          limit,
          category
        }),
      { wrapper }
    );

    expect(mockProductCategoryKey).toHaveBeenCalledWith({
      category,
      location,
      limit
    });

    expect(capturedOptions.queryKey).toBe(fixedQueryKey);
    expect(capturedOptions.queryFn).toBe(fixedQueryFn);

    expect(capturedOptions.getNextPageParam(mockData)).toBe("2024-04-10");

    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("location이 없고 category도 없으면 기본값 '전체'로 queryKey, queryFn를 구성합니다.", () => {
    const limit = 10;

    mockUseLocationStore.mockImplementation((selector) => selector({}));

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      createdAt: `2024-04-${(i + 1).toString().padStart(2, "0")}`
    }));

    const fixedQueryKey = [
      "product",
      "category",
      { category: ProductCategory.전체, location: undefined, limit }
    ];
    const fixedQueryFn = jest.fn();

    mockProductCategoryKey.mockReturnValue({
      queryKey: fixedQueryKey,
      queryFn: fixedQueryFn
    });

    let capturedOptions: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      capturedOptions = options;
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
      () => useCategoryProductListInfiniteQuery({ nextCursor: null, limit }),
      { wrapper }
    );

    expect(mockProductCategoryKey).toHaveBeenCalledWith({
      category: ProductCategory.전체,
      location: undefined,
      limit
    });

    expect(capturedOptions.queryKey).toBe(fixedQueryKey);
    expect(capturedOptions.queryFn).toBe(fixedQueryFn);

    expect(capturedOptions.getNextPageParam(mockData)).toBe("2024-04-10");

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("마지막 페이지의 데이터가 limit보다 작으면 getNextPageParam이 undefined를 반환합니다.", () => {
    const location = "서울";
    const limit = 10;

    mockUseLocationStore.mockImplementation((selector) =>
      selector({ location })
    );

    const mockData = [
      { id: 1, createdAt: "2024-04-01" },
      { id: 2, createdAt: "2024-04-02" }
    ];

    const fixedQueryKey = ["product", "category", { location, limit }];
    const fixedQueryFn = jest.fn();

    mockProductCategoryKey.mockReturnValue({
      queryKey: fixedQueryKey,
      queryFn: fixedQueryFn
    });

    let capturedOptions: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      capturedOptions = options;
      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(
      () => useCategoryProductListInfiniteQuery({ nextCursor: null, limit }),
      { wrapper }
    );

    expect(capturedOptions.getNextPageParam(mockData)).toBeUndefined();
  });

  it("에러 발생 시 error를 반환합니다.", () => {
    mockUseLocationStore.mockImplementation((selector) =>
      selector({ location: "서울" })
    );

    const error = new Error("에러 발생");

    const fixedQueryKey = ["product", "category", { any: "value" }];
    const fixedQueryFn = jest.fn();

    mockProductCategoryKey.mockReturnValue({
      queryKey: fixedQueryKey,
      queryFn: fixedQueryFn
    });

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(
      () => useCategoryProductListInfiniteQuery({ nextCursor: null }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
