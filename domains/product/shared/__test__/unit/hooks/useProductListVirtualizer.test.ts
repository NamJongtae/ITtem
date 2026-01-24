import { act, renderHook } from "@testing-library/react";
import { useProductListVirtualizer } from "@/domains/product/shared/hooks/useProductListVirtualizer";

jest.mock("@/domains/product/shared/hooks/useMediaColums", () => ({
  useMediaColumns: jest.fn()
}));

jest.mock("@/domains/product/shared/hooks/useScrollMargin", () => ({
  useScrollMargin: jest.fn()
}));

jest.mock("@tanstack/react-virtual", () => ({
  useWindowVirtualizer: jest.fn()
}));

import { useMediaColumns } from "@/domains/product/shared/hooks/useMediaColums";
import { useScrollMargin } from "@/domains/product/shared/hooks/useScrollMargin";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

describe("useProductListVirtualizer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const makeVirtualizerMock = () => ({
    measure: jest.fn(),
    getVirtualItems: jest
      .fn()
      .mockReturnValue([{ key: "row-0", index: 0, start: 0, size: 100 }]),
    getTotalSize: jest.fn().mockReturnValue(999),
    measureElement: jest.fn()
  });

  it("rowCount를 itemCount/columns로 계산하고, useWindowVirtualizer에 count로 전달해야 합니다.", () => {
    (useMediaColumns as jest.Mock).mockReturnValue(4);
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 120 });

    const v = makeVirtualizerMock();
    (useWindowVirtualizer as jest.Mock).mockReturnValue(v);

    const { result } = renderHook(() =>
      useProductListVirtualizer(10, { gap: 20, overscan: 2, throttleMs: 100 })
    );

    expect(result.current.rowCount).toBe(3); // ceil(10/4)

    expect(useWindowVirtualizer).toHaveBeenCalledTimes(1);
    const args = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];

    expect(args.count).toBe(3);
    expect(args.gap).toBe(20);
    expect(args.overscan).toBe(2);
    expect(args.scrollMargin).toBe(120);

    expect(typeof args.estimateSize).toBe("function");
    expect(args.estimateSize()).toBeGreaterThan(0);

    expect(result.current.virtualizer).toBe(v);
    expect(result.current.virtualItems).toHaveLength(1);
    expect(result.current.totalSize).toBe(999);

    // ✅ useMediaColumns는 인자를 받지 않음
    expect(useMediaColumns).toHaveBeenCalledTimes(1);

    // ✅ throttleMs는 useScrollMargin으로 내려감
    expect(useScrollMargin).toHaveBeenCalledWith(expect.any(Object), 100);
  });

  it("옵션 미지정 시 기본값(gap=20, overscan=2, throttleMs=100)을 사용해야 합니다.", () => {
    (useMediaColumns as jest.Mock).mockReturnValue(3);
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });

    const v = makeVirtualizerMock();
    (useWindowVirtualizer as jest.Mock).mockReturnValue(v);

    renderHook(() => useProductListVirtualizer(9));

    const args = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];
    expect(args.gap).toBe(20);
    expect(args.overscan).toBe(2);

    // ✅ throttleMs 기본값은 useScrollMargin으로 전달되는지로 검증
    expect(useScrollMargin).toHaveBeenCalledWith(expect.any(Object), 100);

    // ✅ useMediaColumns는 인자를 받지 않음
    expect(useMediaColumns).toHaveBeenCalledTimes(1);
    expect((useMediaColumns as jest.Mock).mock.calls[0]).toHaveLength(0);
  });

  it("columns 변경 시 virtualizer.measure()를 호출해야 합니다.", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });

    const v = makeVirtualizerMock();
    (useWindowVirtualizer as jest.Mock).mockReturnValue(v);

    (useMediaColumns as jest.Mock).mockReturnValue(4);

    const { rerender } = renderHook(
      ({ count }) => useProductListVirtualizer(count),
      { initialProps: { count: 10 } }
    );

    expect(v.measure).toHaveBeenCalledTimes(1);

    (useMediaColumns as jest.Mock).mockReturnValue(2);

    act(() => {
      rerender({ count: 10 });
    });

    expect(v.measure).toHaveBeenCalledTimes(2);
  });

  it("getRowStyle(start)는 (start - scrollMargin) 값을 translateY로 반환해야 합니다.", () => {
    (useMediaColumns as jest.Mock).mockReturnValue(4);
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 200 });

    const v = makeVirtualizerMock();
    (useWindowVirtualizer as jest.Mock).mockReturnValue(v);

    const { result } = renderHook(() => useProductListVirtualizer(10));

    const style = result.current.getRowStyle(350);
    expect(style).toEqual({ transform: "translateY(150px)" });
  });

  it("fallbackRowHeight는 columns에 따라 달라져야 합니다.(estimateSize 결과로 간접 검증)", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });

    const v1 = makeVirtualizerMock();
    (useWindowVirtualizer as jest.Mock).mockReturnValue(v1);

    (useMediaColumns as jest.Mock).mockReturnValue(4);
    renderHook(() => useProductListVirtualizer(10));
    const args1 = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];
    const h1 = args1.estimateSize();

    jest.clearAllMocks();

    (useMediaColumns as jest.Mock).mockReturnValue(1);
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });
    (useWindowVirtualizer as jest.Mock).mockReturnValue(makeVirtualizerMock());

    renderHook(() => useProductListVirtualizer(10));
    const args2 = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];
    const h2 = args2.estimateSize();

    expect(h2).toBeGreaterThan(h1);
  });
});
