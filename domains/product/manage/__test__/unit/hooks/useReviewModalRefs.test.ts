import { renderHook } from "@testing-library/react";
import useReviewModalRefs from "../../../hooks/useReviewModalRefs";

describe("useReviewModalRefs 훅 테스트", () => {
  it("모든 ref가 정의되어 있어야 합니다.", () => {
    const { result } = renderHook(() => useReviewModalRefs());

    expect(result.current.starRef).toBeDefined();
    expect(result.current.textareaRef).toBeDefined();
    expect(result.current.submitBtnRef).toBeDefined();
    expect(result.current.closeBtnRef).toBeDefined();

    expect(result.current.starRef.current).toBeNull();
    expect(result.current.textareaRef.current).toBeNull();
    expect(result.current.submitBtnRef.current).toBeNull();
    expect(result.current.closeBtnRef.current).toBeNull();
  });
});
