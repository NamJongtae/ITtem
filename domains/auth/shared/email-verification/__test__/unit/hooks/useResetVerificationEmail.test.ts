import { renderHook, act } from "@testing-library/react";
import { useContext } from "react";
import useResetVerificationEmail from "../../../hooks/useResetVerificationEmail";
import { useFormContext } from "react-hook-form";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

describe("useResetVerificationEmail 훅 테스트", () => {
  const mockReset = jest.fn();
  const mockClearErrors = jest.fn();

  const mockUseContext = useContext as jest.Mock;
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseContext.mockReturnValue({
      reset: mockReset
    });

    mockUseFormContext.mockReturnValue({
      clearErrors: mockClearErrors
    });
  });

  it("resetSendToVerificationEmail 호출 시 context.reset과 clearErrors('verificationCode')가 호출된다", () => {
    const { result } = renderHook(() => useResetVerificationEmail());

    act(() => {
      result.current.resetSendToVerificationEmail();
    });

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(mockClearErrors).toHaveBeenCalledWith("verificationCode");
  });
});
