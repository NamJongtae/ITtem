import useUserFollowListInfiniteQuery from "@/domains/user/profile/hooks/queries/useUserFollowListInfiniteQuery";
import type { FollowUserData } from "@/domains/user/profile/types/profileTypes";
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

describe("useUserFollowListInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("listType='followers'일 때 followers queryKey/queryFn으로 호출하고 flat data를 반환합니다.", () => {
    const uid = "user-1";
    const limit = 10;

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: `u${i + 1}`,
      nickname: `nick${i + 1}`,
      profileImg: "x",
      followersCount: 0,
      followingsCount: 0,
      isFollow: false,
      productIds: [],
      reviewPercentage: 0
    })) as FollowUserData[];

    const queryKeyConfig = queryKeys.profile.user(uid)._ctx.followers({
      uid,
      limit
    });

    let capturedOptions: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options: any) => {
      capturedOptions = options;
      return {
        data: { pages: [mockData], pageParams: [null] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(() =>
      useUserFollowListInfiniteQuery({ listType: "followers", uid, limit })
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(capturedOptions.queryKey).toEqual(queryKeyConfig.queryKey);
    expect(capturedOptions.queryFn).toEqual(expect.any(Function));
    expect(capturedOptions.initialPageParam).toBeNull();
    expect(capturedOptions.retry).toBe(0);
    expect(typeof capturedOptions.getNextPageParam).toBe("function");

    // getNextPageParam 동작 확인
    expect(capturedOptions.getNextPageParam(mockData)).toBe("u10");

    // pages.flat() 결과 확인
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("listType='followings'일 때 followings queryKey/queryFn으로 호출하고 flat data를 반환합니다.", () => {
    const uid = "user-1";
    const limit = 10;

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: `u${i + 1}`,
      nickname: `nick${i + 1}`,
      profileImg: "x",
      followersCount: 0,
      followingsCount: 0,
      isFollow: false,
      productIds: [],
      reviewPercentage: 0
    })) as FollowUserData[];

    const queryKeyConfig = queryKeys.profile.user(uid)._ctx.followings({
      uid,
      limit
    });

    let capturedOptions: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options: any) => {
      capturedOptions = options;
      return {
        data: { pages: [mockData], pageParams: [null] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    const { result } = renderHook(() =>
      useUserFollowListInfiniteQuery({ listType: "followings", uid, limit })
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(capturedOptions.queryKey).toEqual(queryKeyConfig.queryKey);
    expect(capturedOptions.queryFn).toEqual(expect.any(Function));
    expect(capturedOptions.initialPageParam).toBeNull();
    expect(capturedOptions.retry).toBe(0);

    expect(capturedOptions.getNextPageParam(mockData)).toBe("u10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("마지막 페이지 길이가 limit보다 작으면 getNextPageParam은 undefined를 반환합니다.", () => {
    const uid = "user-1";
    const limit = 10;

    const mockData = [
      {
        uid: "u1",
        nickname: "nick1",
        profileImg: "x",
        followersCount: 0,
        followingsCount: 0,
        isFollow: false,
        productIds: [],
        reviewPercentage: 0
      }
    ] as FollowUserData[];

    let capturedOptions: any;

    mockUseSuspenseInfiniteQuery.mockImplementation((options: any) => {
      capturedOptions = options;
      return {
        data: { pages: [mockData], pageParams: [null] },
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        error: null
      };
    });

    renderHook(() =>
      useUserFollowListInfiniteQuery({ listType: "followers", uid, limit })
    );

    expect(capturedOptions.getNextPageParam(mockData)).toBeUndefined();
  });

  it("에러 발생 시 error를 그대로 반환합니다.", () => {
    const uid = "user-1";
    const error = new Error("에러 발생");

    mockUseSuspenseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error
    });

    const { result } = renderHook(() =>
      useUserFollowListInfiniteQuery({ listType: "followers", uid })
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
