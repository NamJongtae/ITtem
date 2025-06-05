import { renderHook, act } from "@testing-library/react";
import useDebouncing from "@/shared/common/hooks/useDebouncing";

jest.useFakeTimers();

describe("useDebouncing 훅 테스트", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("지정한 시간 후에 콜백이 호출되어야 합니다.", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncing());

    act(() => {
      result.current(callback, 500);
    });

    // 아직 호출되면 안 됨
    expect(callback).not.toHaveBeenCalled();

    // 500ms 경과
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("연속 호출 시 이전 타이머는 취소되어야 합니다.", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncing());

    act(() => {
      result.current(callback, 500); // 첫 호출
    });

    act(() => {
      result.current(callback, 500); // 두 번째 호출 (첫 타이머 취소됨)
    });

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("콜백이 여러 번 호출되면 각 타이머는 독립적으로 동작해야 합니다.", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const { result } = renderHook(() => useDebouncing());

    act(() => {
      result.current(callback1, 300);
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback1).toHaveBeenCalledTimes(1);

    act(() => {
      result.current(callback2, 200);
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
