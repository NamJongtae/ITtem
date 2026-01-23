import { act, renderHook } from "@testing-library/react";
import { useMediaColumns } from "../../../hooks/useMediaColums";

jest.mock("@/shared/common/hooks/useThrottle", () => ({
  useThrottle: (fn: (...args: any[]) => any) => fn
}));

describe("useMediaColumns", () => {
  const setWidth = (w: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: w
    });
  };

  it("초기 innerWidth에 따라 columns를 계산해야 합니다.", () => {
    setWidth(1200); // >=1024
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(4);
    unmount();
  });

  it("768~1023이면 columns=3이어야 합니다.", () => {
    setWidth(900);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(3);
    unmount();
  });

  it("640~767이면 columns=2이어야 합니다.", () => {
    setWidth(700);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(2);
    unmount();
  });

  it("0~639이면 columns=1이어야 합니다.", () => {
    setWidth(500);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(1);
    unmount();
  });

  it("resize 이벤트가 발생하면 columns가 갱신되어야 합니다.", () => {
    setWidth(1200);
    const { result, unmount } = renderHook(() => useMediaColumns());

    expect(result.current).toBe(4);

    act(() => {
      setWidth(700); // => 2
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(2);
    unmount();
  });

  it("mount 시 resize 이벤트 리스너를 등록하고 unmount 시 해제해야 합니다.", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    setWidth(1200);
    const { unmount } = renderHook(() => useMediaColumns());

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("throttleMs 인자를 전달받아도 정상 동작해야 합니다.", () => {
    setWidth(1200);
    const { result, unmount } = renderHook(() => useMediaColumns(300));
    expect(result.current).toBe(4);
    unmount();
  });
});
