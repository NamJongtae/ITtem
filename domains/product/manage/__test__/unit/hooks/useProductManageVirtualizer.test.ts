import { renderHook } from "@testing-library/react";
import { useProductManageVirtualizer } from "@/domains/product/manage/hooks/useProductManageVirtualizer";

jest.mock("@tanstack/react-virtual", () => ({
  useWindowVirtualizer: jest.fn()
}));

jest.mock("@/domains/product/shared/hooks/useScrollMargin", () => ({
  useScrollMargin: jest.fn()
}));

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useScrollMargin } from "@/domains/product/shared/hooks/useScrollMargin";

describe("useProductManageVirtualizer 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function setupVirtualizerMock() {
    const virtualizerMock = {
      getVirtualItems: jest.fn(() => [
        { key: "k0", index: 0, start: 100, size: 200 }
      ]),
      getTotalSize: jest.fn(() => 1234),
      measureElement: jest.fn()
    };

    (useWindowVirtualizer as jest.Mock).mockReturnValue(virtualizerMock);
    return virtualizerMock;
  }

  it("useWindowVirtualizer에 올바른 옵션을 전달해야 한다", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 50 });
    setupVirtualizerMock();

    renderHook(() =>
      useProductManageVirtualizer({ itemCount: 10, overscan: 7 })
    );

    expect(useWindowVirtualizer).toHaveBeenCalledTimes(1);
    const args = (useWindowVirtualizer as jest.Mock).mock.calls[0][0];

    expect(args.count).toBe(10);
    expect(args.overscan).toBe(7);
    expect(args.scrollMargin).toBe(50);
    // estimateSize는 고정 216
    expect(args.estimateSize()).toBe(216);
  });

  it("scrollMargin을 반영해 getRowStyle이 start - scrollMargin을 적용해야 한다", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 80 });
    setupVirtualizerMock();

    const { result } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 1 })
    );

    const style = result.current.getRowStyle(200);
    expect(style).toEqual({ transform: "translateY(120px)" }); // 200 - 80
  });

  it("virtualItems / totalSize는 virtualizer 결과를 그대로 노출해야 한다", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 0 });

    const virtualizerMock = {
      getVirtualItems: jest.fn(() => [
        { key: "k0", index: 0, start: 0, size: 216 },
        { key: "k1", index: 1, start: 216, size: 216 }
      ]),
      getTotalSize: jest.fn(() => 432),
      measureElement: jest.fn()
    };

    (useWindowVirtualizer as jest.Mock).mockReturnValue(virtualizerMock);

    const { result } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 2 })
    );

    expect(result.current.virtualItems).toEqual(
      virtualizerMock.getVirtualItems()
    );
    expect(result.current.totalSize).toBe(432);
  });

  it("listRef를 반환하고, useScrollMargin에 전달해야 한다", () => {
    (useScrollMargin as jest.Mock).mockReturnValue({ scrollMargin: 10 });
    setupVirtualizerMock();

    const { result } = renderHook(() =>
      useProductManageVirtualizer({ itemCount: 1 })
    );

    expect(result.current.listRef).toBeDefined();
    expect(useScrollMargin).toHaveBeenCalledTimes(1);

    const calledWithRef = (useScrollMargin as jest.Mock).mock.calls[0][0];
    expect(calledWithRef).toBe(result.current.listRef);
  });
});
