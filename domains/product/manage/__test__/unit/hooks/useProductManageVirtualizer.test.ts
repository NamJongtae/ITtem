import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useProductManageVirtualizer } from "@/domains/product/manage/hooks/useProductManageVirtualizer"; // 경로 맞게 수정

jest.mock("@tanstack/react-virtual", () => ({
  useWindowVirtualizer: jest.fn()
}));

jest.mock("@/domains/product/shared/hooks/useScrollMargin", () => ({
  useScrollMargin: jest.fn()
}));

jest.mock("@/domains/product/manage/hooks/useProductManageMedia", () => ({
  __esModule: true,
  default: jest.fn()
}));

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useScrollMargin } from "@/domains/product/shared/hooks/useScrollMargin";
import useProductManageMedia from "@/domains/product/manage/hooks/useProductManageMedia";

describe("useProductManageVirtualizer 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function setupVirtualizerMock() {
    const virtualizerMock = {
      measure: jest.fn(),
      getVirtualItems: jest.fn(() => [
        { key: "k0", index: 0, start: 100, size: 200 }
      ]),
      getTotalSize: jest.fn(() => 1234),
      measureElement: jest.fn()
    };

    (useWindowVirtualizer as jest.Mock).mockReturnValue(virtualizerMock);
    return virtualizerMock;
  }

  it("isSmUp=true면 rowHeight=217, false면 rowHeight=169를 사용해야 한다", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 50 });

    // isSmUp = true
    (useProductManageMedia as jest.Mock).mockReturnValue(true);
    const v1 = setupVirtualizerMock();

    const { result: r1, unmount: u1 } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 10, overscan: 3 })
    );

    expect(r1.current.isSmUp).toBe(true);
    expect(r1.current.rowHeight).toBe(217);

    // estimateSize가 rowHeight 기반인지 확인
    const call1 = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];
    expect(call1.count).toBe(10);
    expect(call1.overscan).toBe(3);
    expect(call1.scrollMargin).toBe(50);
    expect(call1.estimateSize()).toBe(217);

    // effect로 measure 호출
    expect(v1.measure).toHaveBeenCalledTimes(1);

    u1();

    // isSmUp = false
    (useProductManageMedia as jest.Mock).mockReturnValue(false);
    const v2 = setupVirtualizerMock();

    const { result: r2 } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 10, overscan: 3 })
    );

    expect(r2.current.isSmUp).toBe(false);
    expect(r2.current.rowHeight).toBe(169);

    const call2 = (useWindowVirtualizer as jest.Mock).mock.calls[1][0];
    expect(call2.estimateSize()).toBe(169);

    expect(v2.measure).toHaveBeenCalledTimes(1);
  });

  it("scrollMargin을 반영해 getRowStyle이 start - scrollMargin을 적용해야 한다", () => {
    (useProductManageMedia as jest.Mock).mockReturnValue(true);
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 80 });
    setupVirtualizerMock();

    const { result } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 1 })
    );

    const style = result.current.getRowStyle(200);
    expect(style).toEqual({ transform: "translateY(120px)" }); // 200 - 80
  });

  it("useWindowVirtualizer에 올바른 옵션을 전달해야 한다", () => {
    (useProductManageMedia as jest.Mock).mockReturnValue(false); // rowHeight 169
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 10 });
    setupVirtualizerMock();

    renderHook(() =>
      useProductManageVirtualizer({ itemCount: 99, overscan: 7 })
    );

    expect(useWindowVirtualizer).toHaveBeenCalledTimes(1);
    const args = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];

    expect(args.count).toBe(99);
    expect(args.overscan).toBe(7);
    expect(args.scrollMargin).toBe(10);
    expect(args.estimateSize()).toBe(169);
  });

  it("virtualItems / totalSize는 virtualizer 결과를 그대로 노출해야 한다", () => {
    (useProductManageMedia as jest.Mock).mockReturnValue(true);
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });

    const virtualizerMock = {
      measure: jest.fn(),
      getVirtualItems: jest.fn(() => [
        { key: "k0", index: 0, start: 0, size: 217 },
        { key: "k1", index: 1, start: 217, size: 217 }
      ]),
      getTotalSize: jest.fn(() => 434),
      measureElement: jest.fn()
    };

    (useWindowVirtualizer as jest.Mock).mockReturnValue(virtualizerMock);

    const { result } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 2 })
    );

    expect(result.current.virtualItems).toEqual(
      virtualizerMock.getVirtualItems()
    );
    expect(result.current.totalSize).toBe(434);
  });

  it("rowHeight가 바뀌면 measure가 다시 호출되어야 한다", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });

    const virtualizerMock = setupVirtualizerMock();

    // 처음엔 false -> 169
    (useProductManageMedia as jest.Mock).mockReturnValue(false);

    const { rerender } = renderHook(
      (p: { itemCount: number }) =>
        useProductManageVirtualizer({ itemCount: p.itemCount }),
      { initialProps: { itemCount: 10 } }
    );

    expect(virtualizerMock.measure).toHaveBeenCalledTimes(1);

    // 다음 렌더에서 true -> 217 (rowHeight 변경)
    (useProductManageMedia as jest.Mock).mockReturnValue(true);

    act(() => {
      rerender({ itemCount: 10 });
    });

    // rowHeight가 바뀌면 effect가 다시 돌면서 measure 호출
    expect(virtualizerMock.measure).toHaveBeenCalledTimes(2);
  });
});
