// __tests__/useThrottle.test.ts
import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "@/shared/common/hooks/useThrottle";

jest.useFakeTimers();

describe("useThrottle 훅 테스트", () => {
  it("초기 호출 시 콜백이 실행되어야 합니다.", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current("test1");
    });

    expect(mockCallback).toHaveBeenCalledWith("test1");
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
    expect(mockCallback).toHaveBeenCalledTimes(1); // 첫 번째만 실행
  });

  it("delay 이후에는 콜백이 다시 실행되어야 합니다.", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    act(() => {
      result.current("test1");
    });

    // 시간이 지남
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current("test2");
    });

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith("test2");
  });
});
