import { renderHook } from "@testing-library/react";
import useNotificationVirtualizer from "@/domains/notification/hooks/useNotificationVirtualizer"; // 경로 맞게 수정
import { useVirtualizer } from "@tanstack/react-virtual";

jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: jest.fn()
}));

describe("useNotificationVirtualizer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const makeItems = (n: number) =>
    Array.from({ length: n }).map((_, i) => ({
      id: String(i + 1)
    })) as any;

  const makeVirtualizerMock = () => ({
    getVirtualItems: jest
      .fn()
      .mockReturnValue([{ key: "k0", index: 0, start: 0, size: 92.5 }]),
    getTotalSize: jest.fn().mockReturnValue(925),
    measureElement: jest.fn()
  });

  it("useVirtualizer를 items.length 기반 count와 옵션으로 호출해야 한다", () => {
    const v = makeVirtualizerMock();
    (useVirtualizer as jest.Mock).mockReturnValue(v);

    const items = makeItems(10);
    renderHook(() => useNotificationVirtualizer({ items }));

    expect(useVirtualizer).toHaveBeenCalledTimes(1);
    const args = (useVirtualizer as jest.Mock).mock.calls[0][0];

    expect(args.count).toBe(10);
    expect(typeof args.getScrollElement).toBe("function");
    expect(typeof args.estimateSize).toBe("function");
    expect(args.estimateSize()).toBe(92.5);
    expect(args.overscan).toBe(3);
    expect(args.scrollMargin).toBe(45);

    expect(args.getScrollElement()).toBeNull();
  });

  it("virtualItems/totalSize는 virtualizer 결과를 그대로 반환해야 한다", () => {
    const v = makeVirtualizerMock();
    (useVirtualizer as jest.Mock).mockReturnValue(v);

    const items = makeItems(3);
    const { result } = renderHook(() => useNotificationVirtualizer({ items }));

    expect(result.current.virtualizer).toBe(v);
    expect(result.current.virtualItems).toEqual(v.getVirtualItems());
    expect(result.current.totalSize).toBe(925);
  });

  it("getRowStyle은 start - scrollMargin(45)을 translateY로 반환해야 한다", () => {
    const v = makeVirtualizerMock();
    (useVirtualizer as jest.Mock).mockReturnValue(v);

    const { result } = renderHook(() =>
      useNotificationVirtualizer({ items: makeItems(1) })
    );

    expect(result.current.getRowStyle(100)).toEqual({
      transform: "translateY(55px)"
    });
  });

  it("items 길이가 바뀌면 useVirtualizer count가 바뀌어야 한다", () => {
    const v = makeVirtualizerMock();
    (useVirtualizer as jest.Mock).mockReturnValue(v);

    const { rerender } = renderHook(
      ({ items }) => useNotificationVirtualizer({ items }),
      { initialProps: { items: makeItems(2) } }
    );

    expect((useVirtualizer as jest.Mock).mock.calls[0][0].count).toBe(2);

    rerender({ items: makeItems(7) });

    expect((useVirtualizer as jest.Mock).mock.calls[1][0].count).toBe(7);
  });
});
