import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "@/shared/common/hooks/useThrottle";

describe("useThrottle 훅 테스트", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("초기 호출 시 콜백이 실행되어야 합니다.", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current("test1");
    });

    expect(mockCallback).toHaveBeenCalledWith("test1");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("delay 시간 동안에는 콜백이 재실행되지 않아야 합니다.", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current("test1");
      result.current("test2");
    });

    expect(mockCallback).toHaveBeenCalledWith("test1");
    expect(mockCallback).not.toHaveBeenCalledWith("test2");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("delay 이후에는 콜백이 다시 실행되어야 합니다.", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current("test1");
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current("test2");
    });

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith("test2");
  });

  it("unmount 시 pending timeout을 clearTimeout 해야 합니다.", () => {
    const mockCallback = jest.fn();

    const clearSpy = jest.spyOn(window, "clearTimeout");

    const { result, unmount } = renderHook(() =>
      useThrottle(mockCallback, 1000)
    );

    act(() => {
      result.current("test1");
    });

    unmount();

    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  it("unmount 후 timer가 진행되어도 추가 호출/에러가 없어야 합니다.", () => {
    const mockCallback = jest.fn();
    const { result, unmount } = renderHook(() =>
      useThrottle(mockCallback, 1000)
    );

    act(() => {
      result.current("test1");
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
