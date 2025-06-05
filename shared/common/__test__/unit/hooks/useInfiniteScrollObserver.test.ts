import { renderHook } from "@testing-library/react";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import * as intersectionObserver from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn()
}));

describe("useInfiniteScrollObserver 훅 테스트", () => {
  // 테스트 후 mock 초기화
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("inView가 ture, hasNextPage가 true, isFetchingNextPage 가 false이면 fetchNextPage를 호출해야 합니다.", () => {
    const fetchNextPage = jest.fn();

    // useInView 훅의 반환값 설정 (요소가 viewport 안에 있는 상태)
    (intersectionObserver.useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true
    });

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false
      })
    );

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("isFetchingNextPage가 true면 fetchNextPage를 호출하지 않아야 합니다.", () => {
    const fetchNextPage = jest.fn();

    (intersectionObserver.useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true
    });

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: true
      })
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("hasNextPage가 false면 fetchNextPage를 호출하지 않아야 합니다.", () => {
    const fetchNextPage = jest.fn();

    (intersectionObserver.useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true
    });

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false
      })
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("inView가 false일 경우 fetchNextPage를 호출하지 않아야 합니다.", () => {
    const fetchNextPage = jest.fn();

    (intersectionObserver.useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false
    });

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false
      })
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });
});
