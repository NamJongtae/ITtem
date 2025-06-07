import { renderHook } from "@testing-library/react";
import { useContext, useRef } from "react";
import { useFocusEmailVerificationInput } from "../../../hooks/useFocusEmailVerificationInput";

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useContext: jest.fn(),
    useRef: jest.fn()
  };
});

describe("useFocusEmailVerificationInput", () => {
  const mockUseContext = useContext as jest.Mock;
  const mockUseRef = useRef as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("emailStatus가 'INITIAL'일 경우 emailRef.current.focus()가 호출되어야 합니다.", () => {
    const mockFocus = jest.fn();
    const fakeRef = { current: { focus: mockFocus } };

    mockUseContext.mockReturnValue({ emailStatus: "INITIAL" });
    mockUseRef.mockReturnValue(fakeRef);

    renderHook(() => useFocusEmailVerificationInput());

    expect(mockFocus).toHaveBeenCalled();
  });

  it("emailStatus가 'SEND'일 경우 focus()가 호출되지 않아야 합니다.", () => {
    const mockFocus = jest.fn();
    const fakeRef = { current: { focus: mockFocus } };

    mockUseContext.mockReturnValue({ emailStatus: "SEND" });
    mockUseRef.mockReturnValue(fakeRef);

    renderHook(() => useFocusEmailVerificationInput());

    expect(mockFocus).not.toHaveBeenCalled();
  });
});
