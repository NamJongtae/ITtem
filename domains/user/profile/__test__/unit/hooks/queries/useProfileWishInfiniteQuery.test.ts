import { renderHook } from "@testing-library/react";
import useProfileWishInfiniteQuery from "@/domains/user/profile/hooks/queries/useProfileWishInfiniteQuery";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import getWishlistProductData from "@/domains/user/profile/api/getWishlistProductData";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProductData } from "@/domains/product/shared/types/productTypes";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

jest.mock("@/domains/user/profile/api/getWishlistProductData");

describe("useProfileWishInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const mockGetWishlistProductData = getWishlistProductData as jest.Mock;
  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queryKey, queryFn을 설정하고 wishlist 데이터 요청 및 데이터를 반환합니다.", async () => {
    const wishProductIds = ["p1", "p2"];
    const limit = 10;

    const mockProducts = Array.from({ length: 10 }, (_, i) => ({
      _id: `product${i + 1}`,
      name: `상품 ${i + 1}`,
      createdAt: `2024-06-${i + 1}`
    })) as ProductData[];

    mockGetWishlistProductData.mockResolvedValue({
      data: { products: mockProducts }
    });

    let getNextPageParamFn: any;
    const queryKey = queryKeys.profile.my._ctx.wish._def;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      options.queryKey = queryKey;
      options.queryFn = mockGetWishlistProductData;
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: { pages: [mockProducts] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(
      () =>
        useProfileWishInfiniteQuery({
          wishProductIds,
          limit
        }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeys.profile.my._ctx.wish._def,
        queryFn: mockGetWishlistProductData
      })
    );

    expect(getNextPageParamFn(mockProducts)).toBe("product10");
    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("마지막 페이지의 상품 수가 limit보다 적으면 getNextPageParam은 undefined를 반환합니다.", () => {
    const mockProducts = [
      { _id: "product1", name: "상품1", createdAt: "2024-06-01" }
    ] as ProductData[];

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: { pages: [mockProducts] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(
      () =>
        useProfileWishInfiniteQuery({
          wishProductIds: ["product1"],
          limit: 10
        }),
      { wrapper }
    );

    expect(getNextPageParamFn(mockProducts)).toBeUndefined();
  });

  it("에러 발생 시 error를 반환합니다.", () => {
    const error = new Error("찜 목록 불러오기 실패");

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(
      () =>
        useProfileWishInfiniteQuery({
          wishProductIds: ["p1", "p2"]
        }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
