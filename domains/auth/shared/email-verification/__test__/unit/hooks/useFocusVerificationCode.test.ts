import { renderHook } from "@testing-library/react";
import { useContext, useRef } from "react";
import useFocusVerificationCode from "../../../hooks/useFocusVerificationCode";

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useContext: jest.fn(),
    useRef: jest.fn()
  };
});

describe("useFocusVerificationCode", () => {
  const mockUseContext = useContext as jest.Mock;
  const mockUseRef = useRef as jest.Mock;

  it("emailStatus가 'SEND'일 경우 verificationCodeRef.current.focus()가 호출되어야 합니다.", () => {
    const mockFocus = jest.fn();

    mockUseContext.mockReturnValue({ emailStatus: "SEND" });
    const fakeRef = { current: { focus: mockFocus } };
    mockUseRef.mockReturnValue(fakeRef);

    renderHook(() => useFocusVerificationCode());

    expect(mockFocus).toHaveBeenCalled();
  });

  it("emailStatus가 'INITIAL'일 경우 focus()가 호출되지 않아야 합니다.", () => {
    mockUseContext.mockReturnValue({ emailStatus: "INITIAL" });

    const mockFocus = jest.fn();
    const fakeRef = { current: { focus: mockFocus } };
    mockUseRef.mockReturnValue(fakeRef);

    renderHook(() => useFocusVerificationCode());

    expect(mockFocus).not.toHaveBeenCalled();
  });

  it("verificationCodeRef.current가 null일 경우 focus()가 호출되지 않아야 합니다.", () => {
    mockUseContext.mockReturnValue({ emailStatus: "SEND" });

    const { result } = renderHook(() => useFocusVerificationCode());

    result.current.verificationCodeRef.current = null;

    expect(result.current.verificationCodeRef.current).toBeNull();
  });
});
