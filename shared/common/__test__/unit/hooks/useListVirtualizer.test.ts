// useListVirtualizer.test.ts
import { renderHook } from "@testing-library/react";
import useListVirtualizer from "@/shared/common/hooks/useListVirtualizer";
import { useVirtualizer } from "@tanstack/react-virtual";

jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: jest.fn()
}));

type MockVirtualItem = { index: number; start: number; size: number };

describe("useListVirtualizer", () => {
  const mockGetVirtualItems = jest.fn<MockVirtualItem[], []>();
  const mockGetTotalSize = jest.fn<number, []>();

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetVirtualItems.mockReturnValue([
      { index: 0, start: 0, size: 80 },
      { index: 1, start: 100, size: 80 }
    ]);
    mockGetTotalSize.mockReturnValue(200);

    (useVirtualizer as jest.Mock).mockReturnValue({
      getVirtualItems: mockGetVirtualItems,
      getTotalSize: mockGetTotalSize
    });
  });

  it("기본값(scrollMargin=0, overscan=3, gap=0)으로 useVirtualizer를 호출한다", () => {
    const items = ["a", "b", "c"];

    renderHook(() =>
      useListVirtualizer({
        items,
        estimateSize: 80
      })
    );

    expect(useVirtualizer).toHaveBeenCalledTimes(1);

    const arg = (useVirtualizer as jest.Mock).mock.calls[0][0];

    expect(arg.count).toBe(items.length);
    expect(typeof arg.getScrollElement).toBe("function");

    // estimateSize는 number면 함수로 래핑되므로 함수인지 확인 + 반환값 확인
    expect(typeof arg.estimateSize).toBe("function");
    expect(arg.estimateSize(0)).toBe(80);

    expect(arg.overscan).toBe(3);
    expect(arg.gap).toBe(0);
    expect(arg.scrollMargin).toBe(0);
  });

  it("옵션(overscan/gap/scrollMargin)을 전달하면 해당 값으로 useVirtualizer를 호출한다", () => {
    const items = [1, 2, 3, 4];

    renderHook(() =>
      useListVirtualizer({
        items,
        estimateSize: 100,
        overscan: 10,
        gap: 20,
        scrollMargin: 52
      })
    );

    const arg = (useVirtualizer as jest.Mock).mock.calls[0][0];

    expect(arg.count).toBe(items.length);
    expect(arg.overscan).toBe(10);
    expect(arg.gap).toBe(20);
    expect(arg.scrollMargin).toBe(52);
    expect(arg.estimateSize(0)).toBe(100);
  });

  it("estimateSize를 함수로 넘기면 그대로 useVirtualizer에 전달한다", () => {
    const items = ["x", "y"];
    const estimateFn = jest.fn((index: number) => (index === 0 ? 80 : 120));

    renderHook(() =>
      useListVirtualizer({
        items,
        estimateSize: estimateFn,
        scrollMargin: 10
      })
    );

    const arg = (useVirtualizer as jest.Mock).mock.calls[0][0];

    // 같은 함수 레퍼런스인지 확인
    expect(arg.estimateSize).toBe(estimateFn);
    // 실제로 호출도 확인 가능
    expect(arg.estimateSize(0)).toBe(80);
    expect(arg.estimateSize(1)).toBe(120);
  });

  it("virtualItems와 totalSize를 virtualizer에서 가져와 반환한다", () => {
    const items = ["a", "b", "c"];

    const { result } = renderHook(() =>
      useListVirtualizer({
        items,
        estimateSize: 80
      })
    );

    expect(mockGetVirtualItems).toHaveBeenCalledTimes(1);
    expect(mockGetTotalSize).toHaveBeenCalledTimes(1);

    expect(result.current.virtualItems).toEqual([
      { index: 0, start: 0, size: 80 },
      { index: 1, start: 100, size: 80 }
    ]);
    expect(result.current.totalSize).toBe(200);
  });

  it("getRowStyle은 start - scrollMargin 값을 translateY에 반영한다", () => {
    const items = ["a"];

    const { result, rerender } = renderHook(
      ({ scrollMargin }) =>
        useListVirtualizer({
          items,
          estimateSize: 80,
          scrollMargin
        }),
      { initialProps: { scrollMargin: 52 } }
    );

    expect(result.current.getRowStyle(200)).toEqual({
      transform: "translateY(148px)"
    });

    // scrollMargin 변경 시 반영되는지
    rerender({ scrollMargin: 10 });
    expect(result.current.getRowStyle(200)).toEqual({
      transform: "translateY(190px)"
    });
  });

  it("parentRef는 초기 null을 가진 ref를 반환한다", () => {
    const { result } = renderHook(() =>
      useListVirtualizer({
        items: ["a"],
        estimateSize: 80
      })
    );

    expect(result.current.parentRef.current).toBeNull();
  });
});
