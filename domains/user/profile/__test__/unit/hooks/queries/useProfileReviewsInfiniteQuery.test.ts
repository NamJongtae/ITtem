import { renderHook } from "@testing-library/react";
import useProfileReviewsInfiniteQuery from "@/domains/user/profile/hooks/queries/useProfileReviewsInfiniteQuery";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type { ProfileReviewData } from "@/domains/user/profile/types/profileTypes";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

describe("useProfileReviewsInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queryKey, queryFn을 설정하고 데이터 요청 및 데이터를 반환합니다.", () => {
    const uid = "user1";
    const limit = 10;

    
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      _id: `review${i + 1}`,
      createdAt: `2024-06-${String(i + 1).padStart(2, "0")}`,
      reviewContent: `리뷰 내용 ${i + 1}`
    })) as ProfileReviewData[];
    
    let getNextPageParamFn: any;
    const queryKeyConfig = queryKeys.profile.user(uid)._ctx.reviews({ limit });

    mockUseSuspenseInfiniteQuery.mockImplementation((options) => {
      options.queryKey = queryKeyConfig.queryKey;
      options.queryFn = queryKeyConfig.queryFn;
      getNextPageParamFn = options.getNextPageParam;
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
      () => useProfileReviewsInfiniteQuery({ uid, limit }),
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
    expect(result.current.error).toBeNull();
  });

  it("마지막 페이지의 리뷰 수가 limit보다 작으면 getNextPageParam은 undefined를 반환합니다.", () => {
    const uid = "user1";
    const limit = 10;

    const mockData = [
      { _id: "review1", createdAt: "2024-06-01", reviewContent: "짧은 리뷰" }
    ] as ProfileReviewData[];

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

    renderHook(() => useProfileReviewsInfiniteQuery({ uid, limit }), {
      wrapper
    });

    expect(getNextPageParamFn(mockData)).toBeUndefined();
  });

  it("에러 발생 시 error를 반환한다", () => {
    const uid = "user1";
    const error = new Error("리뷰 불러오기 실패");

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(
      () => useProfileReviewsInfiniteQuery({ uid }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
