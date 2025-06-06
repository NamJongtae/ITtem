import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import usePasswordChkValidation from "../../../hooks/usePasswordChkValidation";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("usePasswordChkValidation 훅 테스트", () => {
  beforeEach(() => {
    mockUseFormContext.mockReset();
  });

  it("패스워드와 패스워드 확인 값이 다르고, 각 길이가 8 이상일 때 setError를 호출해야 합니다.", () => {
    const mockSetError = jest.fn(); 
    const mockClearErrors = jest.fn(); 

    mockUseFormContext.mockReturnValue({
      watch: jest.fn((name) => {
        if (name === "password") return "password123";
        if (name === "password-check") return "password456";
        return "";
      }),
      setError: mockSetError,
      clearErrors: mockClearErrors,
      formState: { errors: {} }
    });

    renderHook(() => usePasswordChkValidation());

    expect(mockSetError).toHaveBeenCalledWith("password-check", {
      type: "validate",
      message: "비밀번호가 일치하지 않아요."
    });
  });

  it("패스워드와 패스워드 확인 값이 같으면 setError를 호출하지 않아야 합니다.", () => {
    const mockSetError = jest.fn();
    const mockClearErrors = jest.fn();

    mockUseFormContext.mockReturnValue({
      watch: jest.fn((name) => {
        if (name === "password") return "samePassword";
        if (name === "password-check") return "samePassword";
        return "";
      }),
      setError: mockSetError,
      clearErrors: mockClearErrors,
      formState: { errors: {} }
    });

    renderHook(() => usePasswordChkValidation());

    expect(mockSetError).not.toHaveBeenCalled(); 
  });

  it("패스워드 또는 패스워드 확인 값의 길이가 8 미만이면 setError를 호출하지 않아야 합니다.", () => {
    const mockSetError = jest.fn();
    const mockClearErrors = jest.fn(); 

    mockUseFormContext.mockReturnValue({
      watch: jest.fn((name) => {
        if (name === "password") return "short"; 
        if (name === "password-check") return "short";
        return "";
      }),
      setError: mockSetError,
      clearErrors: mockClearErrors,
      formState: { errors: {} }
    });

    renderHook(() => usePasswordChkValidation());

    expect(mockSetError).not.toHaveBeenCalled();
  });
});
