import { renderHook, act } from "@testing-library/react";
import useProductManageMedia from "@/domains/product/manage/hooks/useProductManageMedia"; // 경로는 프로젝트에 맞게 수정

type MqlMock = {
  matches: boolean;
  media: string;
  addEventListener?: jest.Mock;
  removeEventListener?: jest.Mock;
  addListener?: jest.Mock;
  removeListener?: jest.Mock;
  // 테스트에서 change 이벤트를 트리거하기 위한 헬퍼
  __triggerChange?: (next: boolean) => void;
};

describe("useProductManageMedia 훅 테스트", () => {
  const originalMatchMedia = window.matchMedia;

  function setupMatchMedia({
    matches = false,
    supportAddEventListener = true
  }: {
    matches?: boolean;
    supportAddEventListener?: boolean;
  }) {
    let currentMatches = matches;

    const mql: MqlMock = {
      matches: currentMatches,
      media: "(min-width: 640px)"
    };

    // 리스너 저장소
    let changeListener: ((e: { matches: boolean }) => void) | null = null;

    if (supportAddEventListener) {
      mql.addEventListener = jest.fn((type: string, cb: any) => {
        if (type === "change") changeListener = cb;
      });
      mql.removeEventListener = jest.fn((type: string, cb: any) => {
        if (type === "change" && changeListener === cb) changeListener = null;
      });
    } else {
      // 구형 API fallback
      mql.addListener = jest.fn((cb: any) => {
        changeListener = cb;
      });
      mql.removeListener = jest.fn((cb: any) => {
        if (changeListener === cb) changeListener = null;
      });
    }

    mql.__triggerChange = (next: boolean) => {
      currentMatches = next;
      mql.matches = currentMatches;
      changeListener?.({ matches: next });
    };

    // window.matchMedia mock
    (window.matchMedia as any) = jest
      .fn()
      .mockImplementation((query: string) => {
        // 훅의 QUERY가 맞는지만 최소 검증
        expect(query).toBe("(min-width: 640px)");
        return mql;
      });

    return mql;
  }

  afterEach(() => {
    jest.clearAllMocks();
    window.matchMedia = originalMatchMedia;
  });

  it("초기값: matchMedia.matches를 반영해야 한다", () => {
    setupMatchMedia({ matches: true });

    const { result } = renderHook(() => useProductManageMedia());
    expect(result.current).toBe(true);
  });

  it("change 이벤트 발생 시 matches 상태가 갱신되어야 한다 (addEventListener)", () => {
    const mql = setupMatchMedia({
      matches: false,
      supportAddEventListener: true
    });

    const { result } = renderHook(() => useProductManageMedia());
    expect(result.current).toBe(false);

    act(() => {
      mql.__triggerChange?.(true);
    });

    expect(result.current).toBe(true);
    expect(mql.addEventListener).toHaveBeenCalledTimes(1);
    expect(mql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("cleanup 시 리스너가 제거되어야 한다 (addEventListener)", () => {
    const mql = setupMatchMedia({
      matches: false,
      supportAddEventListener: true
    });

    const { unmount } = renderHook(() => useProductManageMedia());

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledTimes(1);
    expect(mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("구형 브라우저 fallback: addListener/removeListener로도 동작해야 한다", () => {
    const mql = setupMatchMedia({
      matches: false,
      supportAddEventListener: false
    });

    const { result, unmount } = renderHook(() => useProductManageMedia());
    expect(result.current).toBe(false);

    act(() => {
      mql.__triggerChange?.(true);
    });
    expect(result.current).toBe(true);

    expect(mql.addListener).toHaveBeenCalledTimes(1);
    expect(mql.addListener).toHaveBeenCalledWith(expect.any(Function));

    unmount();
    expect(mql.removeListener).toHaveBeenCalledTimes(1);
    expect(mql.removeListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
