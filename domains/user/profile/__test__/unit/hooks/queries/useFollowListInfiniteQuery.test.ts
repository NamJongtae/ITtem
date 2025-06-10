import useFollowListInfiniteQuery from "@/domains/user/profile/hooks/queries/useFollowListInfiniteQuery";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseInfiniteQuery: jest.fn()
  };
});

describe("useFollowListInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("isFollowers가 true일 때 followers queryKey, queryFn을 설정하여 데이터 요청 및 데이터를 반환합니다.", () => {
    const limit = 10;
    const userIds = ["user2"];
    const myUid = "user1";

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: `user${i + 1}`,
      followers: [`user${i - 1}`],
      followings: [`other`]
    })) as ProfileData[];

    let getNextPageParamFn: any;

    const queryKeyConfig = queryKeys.profile.my._ctx.followers({
      userIds,
      limit
    });

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
      () =>
        useFollowListInfiniteQuery({
          isFollowers: true,
          userIds,
          uid: myUid,
          limit
        }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        queryFn: queryKeyConfig.queryFn
      })
    );

    // nextCursor 확인
    expect(getNextPageParamFn(mockData)).toBe("user10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("isFollowers가 false일 때 followings queryKey,queryFn을 설정하여 데이터 요청 및 데이터를 반환합니다.", () => {
    const limit = 10;
    const userIds = ["user2"];
    const myUid = "user1";

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: `user${i + 1}`,
      followers: [`user${i - 1}`],
      followings: [`other`]
    })) as ProfileData[];

    let getNextPageParamFn: any;

    const queryKeyConfig = queryKeys.profile.my._ctx.followings({
      userIds,
      limit
    });

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
      () =>
        useFollowListInfiniteQuery({
          isFollowers: false,
          userIds,
          uid: myUid,
          limit
        }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: queryKeyConfig.queryKey,
        queryFn: queryKeyConfig.queryFn
      })
    );

    // nextCursor 확인
    expect(getNextPageParamFn(mockData)).toBe("user10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("마지막 페이지가 limit보다 작으면 getNextPageParam은 undefined를 반환합니다.", () => {
    const userIds = ["user3"];
    const limit = 10;

    const mockData = [
      { uid: "user3", followers: ["user1"], followings: ["other"] }
    ] as ProfileData[];

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

    renderHook(
      () =>
        useFollowListInfiniteQuery({
          isFollowers: true,
          userIds,
          uid: "user1",
          limit
        }),
      { wrapper }
    );

    expect(getNextPageParamFn(mockData)).toBeUndefined();
  });

  it("에러 발생 시 error를 반환합니다.", () => {
    const error = new Error("에러 발생");

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
        useFollowListInfiniteQuery({
          isFollowers: true,
          userIds: ["user1"],
          uid: "user1"
        }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
