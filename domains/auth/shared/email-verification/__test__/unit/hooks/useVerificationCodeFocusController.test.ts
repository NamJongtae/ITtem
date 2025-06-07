import { renderHook, act } from "@testing-library/react";
import useVerificationCodeFocusController from "../../../hooks/useVerificationCodeFocusController";

describe("useVerificationCodeFocusController 훅 테스트", () => {
  it("초기 isFocus는 false입니다.", () => {
    const { result } = renderHook(() => useVerificationCodeFocusController());

    expect(result.current.isFocus).toBe(false);
  });

  it("onFocus가 호출되면 isFocus는 true입니다.", () => {
    const { result } = renderHook(() => useVerificationCodeFocusController());

    act(() => {
      result.current.onFocus();
    });

    expect(result.current.isFocus).toBe(true);
  });

  it("onBlur가 호출되면 isFocus는 true입니다.", () => {
    const { result } = renderHook(() => useVerificationCodeFocusController());

    act(() => {
      result.current.onBlur();
    });

    expect(result.current.isFocus).toBe(true);
  });
});
