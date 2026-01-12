import { renderHook } from "@testing-library/react";
import useProfileWishInfiniteQuery from "@/domains/user/profile/hooks/queries/useProfileWishInfiniteQuery";
import {
  useSuspenseInfiniteQuery,
  type InfiniteData,
  type UseSuspenseInfiniteQueryOptions
} from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import getWishlistProductData from "@/domains/user/profile/api/getWishlistProductData";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { WishlistProductData } from "@/domains/user/profile/types/profileTypes";
import type { AxiosError } from "axios";

type WishInfiniteOptions = UseSuspenseInfiniteQueryOptions<
  WishlistProductData,
  AxiosError,
  InfiniteData<WishlistProductData[]>,
  readonly unknown[],
  string | null
>;

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

jest.mock("@/domains/user/profile/api/getWishlistProductData");

describe("useProfileWishInfiniteQuery 훅 테스트 (typed mock)", () => {
  const mockUseSuspenseInfiniteQuery =
    useSuspenseInfiniteQuery as jest.MockedFunction<
      typeof useSuspenseInfiniteQuery
    >;

  const mockGetWishlistProductData =
    getWishlistProductData as jest.MockedFunction<
      typeof getWishlistProductData
    >;

  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queryKey를 limit 기반으로 설정하고, queryFn이 getWishlistProductData를 호출합니다.", async () => {
    const limit = 10;

    const mockProducts = Array.from({ length: 10 }, (_, i) => ({
      _id: `product${i + 1}`,
      name: `상품 ${i + 1}`,
      createdAt: `2024-06-${String(i + 1).padStart(2, "0")}`
    })) as WishlistProductData[];

    mockGetWishlistProductData.mockResolvedValue({
      data: { products: mockProducts }
    } as any);

    let capturedOptions: WishInfiniteOptions | undefined;

    mockUseSuspenseInfiniteQuery.mockImplementation((options: any) => {
      capturedOptions = options;
      return {
        data: { pages: [mockProducts], pageParams: [null] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      } as any;
    });

    const { result } = renderHook(
      () => useProfileWishInfiniteQuery({ limit }),
      {
        wrapper
      }
    );

    // ✅ queryKey 검증
    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeys.profile.my._ctx.wish({ limit }).queryKey,
        initialPageParam: null,
        retry: 0
      })
    );

    // ✅ queryFn이 내부에서 getWishlistProductData를 호출하는지 검증
    expect(capturedOptions).toBeTruthy();
    await (capturedOptions as any).queryFn({ pageParam: "cursor-abc" });

    expect(mockGetWishlistProductData).toHaveBeenCalledWith({
      cursor: "cursor-abc",
      limit
    });

    // ✅ 반환 데이터 flatten 검증
    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("마지막 페이지 길이가 limit보다 작으면 getNextPageParam은 undefined", () => {
    const limit = 10;
    const mockProducts = [
      { _id: "product1", name: "상품1", createdAt: "2024-06-01" }
    ] as WishlistProductData[];

    let capturedOptions: WishInfiniteOptions | undefined;

    mockUseSuspenseInfiniteQuery.mockImplementation((options: any) => {
      capturedOptions = options;
      return {
        data: { pages: [mockProducts], pageParams: [null] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      } as any;
    });

    renderHook(() => useProfileWishInfiniteQuery({ limit }), { wrapper });

    const next = (capturedOptions as any).getNextPageParam(mockProducts);
    expect(next).toBeUndefined();
  });

  it("마지막 페이지 길이가 limit과 같으면 getNextPageParam은 마지막 _id를 반환", () => {
    const limit = 3;

    const mockProducts = [
      { _id: "p1", name: "상품1" },
      { _id: "p2", name: "상품2" },
      { _id: "p3", name: "상품3" }
    ] as WishlistProductData[];

    let capturedOptions: WishInfiniteOptions | undefined;

    mockUseSuspenseInfiniteQuery.mockImplementation((options: any) => {
      capturedOptions = options;
      return {
        data: { pages: [mockProducts], pageParams: [null] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      } as any;
    });

    renderHook(() => useProfileWishInfiniteQuery({ limit }), { wrapper });

    const next = (capturedOptions as any).getNextPageParam(mockProducts);
    expect(next).toBe("p3");
  });

  it("에러 발생 시 error를 반환합니다.", () => {
    const error = new Error("찜 목록 불러오기 실패") as any;

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    } as any);

    const { result } = renderHook(() => useProfileWishInfiniteQuery({}), {
      wrapper
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
