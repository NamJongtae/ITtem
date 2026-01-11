import useMyFollowListInfiniteQuery from "@/domains/user/profile/hooks/queries/useMyFollowListInfiniteQuery";
import type { FollowUserData } from "@/domains/user/profile/types/profileTypes";
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

jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

import useAuthStore from "@/domains/auth/shared/common/store/authStore";

describe("useMyFollowListInfiniteQuery 훅 테스트", () => {
  const mockUseSuspenseInfiniteQuery = useSuspenseInfiniteQuery as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const { Wrapper: wrapper } = createQueryClientWrapper();

  const myUid = "user1";

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: myUid } })
    );
  });

  it("listType='followers'일 때 followers queryKey/queryFn으로 호출하고 flat data를 반환합니다.", () => {
    const limit = 10;

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: `user${i + 1}`,
      nickname: `nick${i + 1}`,
      profileImg: "x",
      followersCount: 0,
      followingsCount: 0,
      isFollow: false,
      productIds: [],
      reviewPercentage: 0
    })) as FollowUserData[];

    const queryKeyConfig = queryKeys.profile.my._ctx.followers({
      uid: myUid,
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

    const { result } = renderHook(
      () => useMyFollowListInfiniteQuery({ listType: "followers", limit }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(capturedOptions.queryKey).toEqual(queryKeyConfig.queryKey);
    expect(capturedOptions.queryFn).toEqual(expect.any(Function));
    expect(capturedOptions.initialPageParam).toBeNull();
    expect(capturedOptions.retry).toBe(0);
    expect(typeof capturedOptions.getNextPageParam).toBe("function");
    expect(capturedOptions.getNextPageParam(mockData)).toBe("user10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("listType='followings'일 때 followings queryKey/queryFn으로 호출하고 flat data를 반환합니다.", () => {
    const limit = 10;

    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: `user${i + 1}`,
      nickname: `nick${i + 1}`,
      profileImg: "x",
      followersCount: 0,
      followingsCount: 0,
      isFollow: false,
      productIds: [],
      reviewPercentage: 0
    })) as FollowUserData[];

    const queryKeyConfig = queryKeys.profile.my._ctx.followings({
      uid: myUid,
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

    const { result } = renderHook(
      () => useMyFollowListInfiniteQuery({ listType: "followings", limit }),
      { wrapper }
    );

    expect(mockUseSuspenseInfiniteQuery).toHaveBeenCalledTimes(1);
    expect(capturedOptions.queryKey).toEqual(queryKeyConfig.queryKey);
    expect(capturedOptions.queryFn).toEqual(expect.any(Function));
    expect(capturedOptions.initialPageParam).toBeNull();
    expect(capturedOptions.retry).toBe(0);

    expect(capturedOptions.getNextPageParam(mockData)).toBe("user10");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("마지막 페이지 길이가 limit보다 작으면 getNextPageParam은 undefined를 반환합니다.", () => {
    const limit = 10;

    const mockData = [
      {
        uid: "user3",
        nickname: "nick3",
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

    renderHook(
      () => useMyFollowListInfiniteQuery({ listType: "followers", limit }),
      { wrapper }
    );

    expect(capturedOptions.getNextPageParam(mockData)).toBeUndefined();
  });

  it("에러 발생 시 error를 그대로 반환합니다.", () => {
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
      () => useMyFollowListInfiniteQuery({ listType: "followers" }),
      { wrapper }
    );

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });
});
