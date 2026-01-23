import { act, renderHook } from "@testing-library/react";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import * as intersectionObserver from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn()
}));

describe("useInfiniteScrollObserver 훅 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUseInView = (inView: boolean) => {
    (intersectionObserver.useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView
    });
  };

  it("inView=true, hasNextPage=true, isFetchingNextPage=false이면 fetchNextPage를 1회 호출해야 합니다.", () => {
    const fetchNextPage = jest.fn();
    mockUseInView(true);

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false
      })
    );

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("isFetchingNextPage=true이면 fetchNextPage를 호출하지 않아야 합니다.", () => {
    const fetchNextPage = jest.fn();
    mockUseInView(true);

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: true
      })
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("hasNextPage=false이면 fetchNextPage를 호출하지 않아야 합니다.", () => {
    const fetchNextPage = jest.fn();
    mockUseInView(true);

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false
      })
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("inView=false이면 fetchNextPage를 호출하지 않아야 합니다.", () => {
    const fetchNextPage = jest.fn();
    mockUseInView(false);

    renderHook(() =>
      useInfiniteScrollObserver({
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false
      })
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("inView=true 상태가 유지되어도 '뷰 진입당 1회'만 호출해야 합니다.", () => {
    const fetchNextPage = jest.fn();

    mockUseInView(true);
    const { rerender } = renderHook(
      (props: { hasNextPage: boolean; isFetchingNextPage: boolean }) =>
        useInfiniteScrollObserver({
          fetchNextPage,
          hasNextPage: props.hasNextPage,
          isFetchingNextPage: props.isFetchingNextPage
        }),
      { initialProps: { hasNextPage: true, isFetchingNextPage: false } }
    );

    expect(fetchNextPage).toHaveBeenCalledTimes(1);

    // 같은 inView=true 상태로 rerender(= effect 재실행 가능성)해도 2번 호출되면 안됨
    act(() => {
      rerender({ hasNextPage: true, isFetchingNextPage: false });
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("inView가 false로 나갔다가 true로 다시 들어오면 다시 1회 호출해야 합니다.", () => {
    const fetchNextPage = jest.fn();

    // 1) 처음엔 inView=true -> 1회 호출
    mockUseInView(true);
    const { rerender } = renderHook(
      (props: { hasNextPage: boolean; isFetchingNextPage: boolean }) =>
        useInfiniteScrollObserver({
          fetchNextPage,
          hasNextPage: props.hasNextPage,
          isFetchingNextPage: props.isFetchingNextPage
        }),
      { initialProps: { hasNextPage: true, isFetchingNextPage: false } }
    );

    expect(fetchNextPage).toHaveBeenCalledTimes(1);

    // 2) inView=false -> fired 리셋
    mockUseInView(false);
    act(() => {
      rerender({ hasNextPage: true, isFetchingNextPage: false });
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);

    // 3) 다시 inView=true -> 다시 1회 호출(총 2회)
    mockUseInView(true);
    act(() => {
      rerender({ hasNextPage: true, isFetchingNextPage: false });
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(2);
  });

  it("inView=true라도 hasNextPage/isFetchingNextPage 조건이 바뀌면 호출 여부가 제어되어야 합니다.", () => {
    const fetchNextPage = jest.fn();

    mockUseInView(true);
    const { rerender } = renderHook(
      (props: { hasNextPage: boolean; isFetchingNextPage: boolean }) =>
        useInfiniteScrollObserver({
          fetchNextPage,
          hasNextPage: props.hasNextPage,
          isFetchingNextPage: props.isFetchingNextPage
        }),
      { initialProps: { hasNextPage: false, isFetchingNextPage: false } }
    );

    // hasNextPage=false라서 호출 X
    expect(fetchNextPage).toHaveBeenCalledTimes(0);

    // hasNextPage=true로 바뀌면 "진입당 1회" 규칙상 여기서 1회 호출 가능
    act(() => {
      rerender({ hasNextPage: true, isFetchingNextPage: false });
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);

    // fetching=true면 호출 X
    act(() => {
      rerender({ hasNextPage: true, isFetchingNextPage: true });
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });
});
