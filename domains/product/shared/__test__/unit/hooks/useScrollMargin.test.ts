import { act, renderHook } from "@testing-library/react";
import { useScrollMargin } from "../../../hooks/useScrollMargin";

jest.mock("@/shared/common/hooks/useThrottle", () => ({
  useThrottle: (fn: (...args: any[]) => any) => fn
}));

describe("useScrollMargin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setScrollY = (y: number) => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: y
    });
  };

  it("mount 시 scrollMargin을 (rect.top + window.scrollY)로 계산해야 합니다.", () => {
    // scrollY 고정
    setScrollY(300);

    // ref 대상 element 준비
    const el = document.createElement("div");

    // getBoundingClientRect().top을 고정 값으로 mock
    const rectSpy = jest.spyOn(el, "getBoundingClientRect").mockReturnValue({
      top: 120,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    } as DOMRect);

    const refObj: React.RefObject<HTMLDivElement> = { current: el };

    const { result, unmount } = renderHook(() => useScrollMargin(refObj, 100));

    expect(result.current.scrollMargin).toBe(120 + 300);

    rectSpy.mockRestore();
    unmount();
  });

  it("ref.current가 null이면 scrollMargin이 0을 유지해야 합니다.", () => {
    setScrollY(200);
    const refObj: React.RefObject<HTMLDivElement | null> = { current: null };

    const { result, unmount } = renderHook(() => useScrollMargin(refObj, 100));

    expect(result.current.scrollMargin).toBe(0);
    unmount();
  });

  it("resize 이벤트가 발생하면 scrollMargin을 다시 계산해야 합니다.", () => {
    setScrollY(100);

    const el = document.createElement("div");

    // 처음 top=50 → margin=150
    const rectSpy = jest.spyOn(el, "getBoundingClientRect").mockReturnValue({
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    } as DOMRect);

    const refObj: React.RefObject<HTMLDivElement> = { current: el };

    const { result, unmount } = renderHook(() => useScrollMargin(refObj, 100));

    expect(result.current.scrollMargin).toBe(50 + 100);

    // resize 시 top이 80으로 바뀐 상황을 만들기 위해 반환값 변경
    rectSpy.mockReturnValue({
      top: 80,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    } as DOMRect);

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.scrollMargin).toBe(80 + 100);

    rectSpy.mockRestore();
    unmount();
  });

  it("mount 시 resize 이벤트 리스너를 등록하고 unmount 시 해제해야 합니다.", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const el = document.createElement("div");
    jest.spyOn(el, "getBoundingClientRect").mockReturnValue({
      top: 10,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    } as DOMRect);

    const refObj: React.RefObject<HTMLDivElement> = { current: el };

    const { unmount } = renderHook(() => useScrollMargin(refObj, 100));

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
