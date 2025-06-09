import { renderHook } from "@testing-library/react";
import useSearchProductListInfiniteQuery from "@/domains/product/shared/hooks/queries/useSearchProductListInfiniteQuery";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

jest.mock("@/shared/common/hooks/useGetQuerys");

describe("useSearchProductListInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const mockUseGetQuerys = useGetQuerys as jest.Mock;

  const wrapper = createQueryClientWrapper().Wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("category, keyword가 있는 경우 queryKey, queryFn이 구성되고 데이터를 반환합니다.", () => {
    const keyword = "가방";
    const category = ProductCategory.가방지갑;
    const limit = 10;

    mockUseGetQuerys.mockReturnValue({ keyword, category });

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      createdAt: `2024-04-${(i + 1).toString().padStart(2, "0")}`
    }));

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: {
          pages: [mockData]
        },
        isLoading: false,
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(
      () => useSearchProductListInfiniteQuery({ limit }),
      { wrapper }
    );

    const expectedQueryKey = queryKeys.product.search({
      keyword,
      category,
      limit
    }).queryKey;

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedQueryKey
      })
    );

    expect(getNextPageParamFn(mockData)).toBe("2024-04-10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("category가 없는 경우 기본값 '전체'로 queryKey, queryFn이 구성되고 데이터를 반환합니다.", () => {
    const keyword = "신발";
    const limit = 10;

    mockUseGetQuerys.mockReturnValue({ keyword, category: undefined });

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      createdAt: `2024-04-${(i + 1).toString().padStart(2, "0")}`
    }));

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: {
          pages: [mockData]
        },
        isLoading: false,
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(() => useSearchProductListInfiniteQuery({ limit }), {
      wrapper
    });

    const expectedQueryKey = queryKeys.product.search({
      keyword,
      category: ProductCategory.전체,
      limit
    }).queryKey;

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedQueryKey
      })
    );

    expect(getNextPageParamFn(mockData)).toBe("2024-04-10");
  });

  it("마지막 페이지 데이터 수가 limit보다 작으면 getNextPageParam이 undefined를 반환합니다.", () => {
    const keyword = "노트북";
    const category = ProductCategory.전자기기;
    const limit = 10;

    mockUseGetQuerys.mockReturnValue({ keyword, category });

    const mockData = [
      { id: 1, createdAt: "2024-04-01" },
      { id: 2, createdAt: "2024-04-02" }
    ];

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: {
          pages: [mockData]
        },
        isLoading: false,
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(() => useSearchProductListInfiniteQuery({ limit }), {
      wrapper
    });

    expect(getNextPageParamFn(mockData)).toBeUndefined();
  });

  it("에러가 발생한 경우 error를 반환합니다.", () => {
    const keyword = "가방";
    const category = ProductCategory.가방지갑;

    mockUseGetQuerys.mockReturnValue({ keyword, category });

    const error = new Error("검색 실패");

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(() => useSearchProductListInfiniteQuery(), {
      wrapper
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
