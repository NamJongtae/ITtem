import { renderHook } from "@testing-library/react";
import useProfileProductListInfiniteQuery from "@/domains/user/profile/hooks/queries/useProfileProductListInfiniteQuery";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import profileQueryKey from "@/domains/user/profile/query-keys/profileQueryKeys";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

jest.mock("next/navigation");
jest.mock("@/domains/auth/shared/common/store/authStore");

describe("useProfileProductListInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("productListType이 MY_PROFILE일 때 해당 queryKey, queryFn 설정하여 데이터 요청 및 데이터를 반환합니다.", () => {
    const limit = 10;
    const productIds = ["p1", "p2"];
    const category = ProductCategory.전체;

    mockUseAuthStore.mockImplementation(() => ({
      user: { uid: "me" }
    }));

    const queryKeyConfig = queryKeys.profile.my._ctx.products({
      category,
      limit,
      productIds
    });

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: `product${i + 1}`,
      createdAt: `2024-06-${i + 1}`
    }));

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      options.queryKey = queryKeyConfig.queryKey;
      options.queryFn = queryKeyConfig.queryFn;
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(
      () =>
        useProfileProductListInfiniteQuery({
          limit,
          productListType: "MY_PROFILE",
          productCategory: category,
          productIds
        }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        queryFn: queryKeyConfig.queryFn
      })
    );
    expect(getNextPageParamFn(mockData)).toBe("2024-06-10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("productListType이 USER_PROFILE일 때 해당 queryKey, queryFn 설정하여 데이터 요청 및데이터를 반환합니다.", () => {
    const limit = 10;
    const productIds = ["p1"];
    const category = ProductCategory.가방지갑;

    mockUseAuthStore.mockImplementation(() => ({
      user: { uid: "me" }
    }));

    mockUseParams.mockReturnValue({ uid: "otherUser" });

    const queryKeyConfig = profileQueryKey.user("otherUser")._ctx.products({
      category,
      limit,
      productIds
    });

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: `product${i + 1}`,
      createdAt: `2024-06-${i + 1}`
    }));

    let getNextPageParamFn: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      options.queryKey = queryKeyConfig.queryKey;
      options.queryFn = queryKeyConfig.queryFn;
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(
      () =>
        useProfileProductListInfiniteQuery({
          limit,
          productListType: "PROFILE",
          productCategory: category,
          productIds
        }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        queryFn: queryKeyConfig.queryFn
      })
    );
    expect(getNextPageParamFn(mockData)).toBe("2024-06-10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("마지막 페이지가 limit보다 작으면 getNextPageParam은 undefined를 반환합니다.", () => {
    const limit = 10;
    const productIds = ["p1"];
    const category = ProductCategory.가방지갑;

    const mockData = [
      { id: "p1", createdAt: "2024-06-01" },
      { id: "p2", createdAt: "2024-06-02" }
    ];
    mockUseAuthStore.mockImplementation(() => ({
      user: { uid: "me" }
    }));

    let getNextPageParamFn: any;
    const queryKeyConfig = profileQueryKey.user("otherUser")._ctx.products({
      category,
      limit,
      productIds
    });

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      options.queryKey = queryKeyConfig.queryKey;
      options.queryFn = queryKeyConfig.queryFn;
      getNextPageParamFn = options.getNextPageParam;
      return {
        data: { pages: [mockData] },
        isLoading: false,
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(
      () =>
        useProfileProductListInfiniteQuery({
          limit,
          productListType: "MY_PROFILE",
          productCategory: ProductCategory.전체,
          productIds: ["p1", "p2"]
        }),
      { wrapper }
    );

    expect(getNextPageParamFn(mockData)).toBeUndefined();
  });

  it("에러 발생 시 error를 반환합니다.", () => {
    const error = new Error("불러오기 실패");

    mockUseAuthStore.mockImplementation(() => ({
      user: { uid: "me" }
    }));

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(
      () =>
        useProfileProductListInfiniteQuery({
          limit: 10,
          productListType: "MY_PROFILE",
          productCategory: ProductCategory.전체,
          productIds: ["p1"]
        }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
