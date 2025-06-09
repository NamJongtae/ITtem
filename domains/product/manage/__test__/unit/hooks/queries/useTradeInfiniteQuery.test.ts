import { renderHook } from "@testing-library/react";
import useTradeInfiniteQuery from "@/domains/product/manage/hooks/queries/useTradeInfiniteQuery";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { useInfiniteQuery } from "@tanstack/react-query";
import useProductManageUrlQuerys from "@/domains/product/manage/hooks/useProductManageUrlQuerys";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useInfiniteQuery: jest.fn()
  };
});

jest.mock("@/domains/product/manage/hooks/useProductManageUrlQuerys");

describe("useTradeInfiniteQuery 훅 테스트", () => {
  const mockUseInfiniteQuery = useInfiniteQuery as jest.Mock;
  const mockUseProductManageUrlQuerys = useProductManageUrlQuerys as jest.Mock;

  const wrapper = createQueryClientWrapper().Wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menu가 'sale'인 경우 saleStartDate를 커서로 사용하여 판매 데이터를 조회합니다.", () => {
    const menu = "sale";
    const search = "abc";
    const status = "TRADING";

    mockUseProductManageUrlQuerys.mockReturnValue({
      menu,
      search,
      status
    });

    // 11개 데이터 다음 페이지 확인을 위해
    const salesData = Array.from({ length: 10 }, (_, i) => ({
      saleStartDate: `2024-04-${(i + 1).toString().padStart(2, "0")}`,
      id: i + 1
    }));

    let getNextPageParamFn: any;
    mockUseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: {
          pages: [salesData]
        },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(() => useTradeInfiniteQuery(10), {
      wrapper
    });

    const expectedQueryKey = queryKeys.product.manage({
      menu,
      search,
      status,
      limit: 10
    }).queryKey;

    expect(mockUseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedQueryKey
      })
    );
    expect(getNextPageParamFn(salesData)).toBe("2024-04-10");
    expect(result.current.data).toEqual(salesData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("menu가 'purchase'인 경우 구매 purchaseStartDate를 커서로 구매 데이터를 조회합니다.", () => {
    const menu = "purchase";
    const search = "";
    const status = "TRADING";

    mockUseProductManageUrlQuerys.mockReturnValue({
      menu,
      search,
      status
    });

    const purchaseData = Array.from({ length: 10 }, (_, i) => ({
      purchaseStartDate: `2024-04-${(i + 1).toString().padStart(2, "0")}`,
      id: i + 1
    }));

    let getNextPageParamFn: any;
    mockUseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: {
          pages: [purchaseData]
        },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(() => useTradeInfiniteQuery(10), {
      wrapper
    });

    const expectedQueryKey = queryKeys.product.manage({
      menu,
      search,
      status,
      limit: 10
    }).queryKey;

    expect(mockUseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedQueryKey
      })
    );
    expect(getNextPageParamFn(purchaseData)).toBe("2024-04-10");
    expect(result.current.data).toEqual(purchaseData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("에러 발생 시 error을 반환합니다.", () => {
    const menu = "sale";
    const search = "";
    const status = "";

    mockUseProductManageUrlQuerys.mockReturnValue({
      menu,
      search,
      status
    });

    const mockError = new Error("에러 발생");
    mockUseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error: mockError
    });

    const { result } = renderHook(() => useTradeInfiniteQuery(10), {
      wrapper
    });

    const expectedQueryKey = queryKeys.product.manage({
      menu,
      search,
      status,
      limit: 10
    }).queryKey;

    expect(mockUseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedQueryKey
      })
    );
    expect(result.current.error).toBe(mockError);
    expect(result.current.data).toBeUndefined();
  });
});
