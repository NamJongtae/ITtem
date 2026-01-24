import { act, renderHook } from "@testing-library/react";
import { useMediaColumns } from "../../../hooks/useMediaColums";

type Mql = {
  matches: boolean;
  media: string;
  addEventListener?: jest.Mock;
  removeEventListener?: jest.Mock;
  addListener?: jest.Mock;
  removeListener?: jest.Mock;
  __triggerChange?: () => void;
};

describe("useMediaColumns 훅 테스트", () => {
  const originalMatchMedia = window.matchMedia;

  const setWidth = (w: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: w
    });
  };

  function setupMatchMediaMocks({ supportAddEventListener = true } = {}) {
    const mqlMap = new Map<string, Mql>();

    const makeMql = (query: string): Mql => {
      let listener: (() => void) | null = null;

      const mql: Mql = {
        media: query,
        // 현재 width 기준으로 matches 계산
        get matches() {
          const w = window.innerWidth;
          if (query.includes("1024")) return w >= 1024;
          if (query.includes("768")) return w >= 768;
          if (query.includes("640")) return w >= 640;
          return false;
        }
      } as any;

      if (supportAddEventListener) {
        mql.addEventListener = jest.fn((type: string, cb: any) => {
          if (type === "change") listener = cb;
        });
        mql.removeEventListener = jest.fn((type: string, cb: any) => {
          if (type === "change" && listener === cb) listener = null;
        });
      } else {
        mql.addListener = jest.fn((cb: any) => {
          listener = cb;
        });
        mql.removeListener = jest.fn((cb: any) => {
          if (listener === cb) listener = null;
        });
      }

      mql.__triggerChange = () => listener?.();
      return mql;
    };

    (window.matchMedia as any) = jest.fn().mockImplementation((query: string) => {
      if (!mqlMap.has(query)) mqlMap.set(query, makeMql(query));
      return mqlMap.get(query)!;
    });

    return {
      getMql: (query: string) => mqlMap.get(query)!,
      triggerAll: () => mqlMap.forEach((mql) => mql.__triggerChange?.())
    };
  }

  afterEach(() => {
    jest.clearAllMocks();
    window.matchMedia = originalMatchMedia;
  });

  it("초기 innerWidth에 따라 columns를 계산해야 합니다.", () => {
    setupMatchMediaMocks();
    setWidth(1200);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(4);
    unmount();
  });

  it("768~1023이면 columns=3이어야 합니다.", () => {
    setupMatchMediaMocks();
    setWidth(900);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(3);
    unmount();
  });

  it("640~767이면 columns=2이어야 합니다.", () => {
    setupMatchMediaMocks();
    setWidth(700);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(2);
    unmount();
  });

  it("0~639이면 columns=1이어야 합니다.", () => {
    setupMatchMediaMocks();
    setWidth(500);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(1);
    unmount();
  });

  it("breakpoint change 이벤트가 발생하면 columns가 갱신되어야 합니다.", () => {
    const { triggerAll } = setupMatchMediaMocks();
    setWidth(1200);
    const { result, unmount } = renderHook(() => useMediaColumns());

    expect(result.current).toBe(4);

    act(() => {
      setWidth(700); // => 2
      triggerAll();  // matchMedia change 발생 가정
    });

    expect(result.current).toBe(2);
    unmount();
  });

  it("mql change 리스너를 등록하고 unmount 시 해제해야 합니다. (addEventListener)", () => {
    const { getMql } = setupMatchMediaMocks({ supportAddEventListener: true });

    setWidth(1200);
    const { unmount } = renderHook(() => useMediaColumns());

    const lg = getMql("(min-width: 1024px)");
    const md = getMql("(min-width: 768px)");
    const sm = getMql("(min-width: 640px)");

    expect(lg.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(md.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(sm.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));

    unmount();

    expect(lg.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(md.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(sm.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("구형 브라우저 fallback(addListener/removeListener)도 동작해야 합니다.", () => {
    const { getMql, triggerAll } = setupMatchMediaMocks({ supportAddEventListener: false });

    setWidth(500);
    const { result, unmount } = renderHook(() => useMediaColumns());
    expect(result.current).toBe(1);

    act(() => {
      setWidth(1200);
      triggerAll();
    });
    expect(result.current).toBe(4);

    const lg = getMql("(min-width: 1024px)");
    const md = getMql("(min-width: 768px)");
    const sm = getMql("(min-width: 640px)");

    expect(lg.addListener).toHaveBeenCalledWith(expect.any(Function));
    expect(md.addListener).toHaveBeenCalledWith(expect.any(Function));
    expect(sm.addListener).toHaveBeenCalledWith(expect.any(Function));

    unmount();

    expect(lg.removeListener).toHaveBeenCalledWith(expect.any(Function));
    expect(md.removeListener).toHaveBeenCalledWith(expect.any(Function));
    expect(sm.removeListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
