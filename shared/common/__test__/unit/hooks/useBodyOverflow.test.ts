import { renderHook } from "@testing-library/react";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";

describe("useBodyOverflow 훅 테스트", () => {
  afterEach(() => {
    document.body.style.overflow = "auto";
  });

  it("isLocked가 true일 때 body overflow는 'hidden'이어야 합니다.", () => {
    renderHook(() => useBodyOverflow({ isLocked: true }));

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("isLocked가 false일 때 body overflow는 변경되지 않아야 합니다.", () => {
    renderHook(() => useBodyOverflow({ isLocked: false }));

    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("언마운트 시 overflow가 'auto'로 복원돼야 합니다.", () => {
    const { unmount } = renderHook(() => useBodyOverflow({ isLocked: true }));

    // 언마운트 호출
    unmount();

    expect(document.body.style.overflow).toBe("auto");
  });
});
