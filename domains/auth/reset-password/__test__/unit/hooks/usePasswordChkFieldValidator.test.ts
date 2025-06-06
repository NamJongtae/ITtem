import { renderHook, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import usePasswordChkFieldValidator from "../../../hooks/usePasswordChkFieldValidator";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("usePasswordChkFieldValidator 훅 테스트", () => {
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
      clearErrors: mockClearErrors
    });

    renderHook(() => usePasswordChkFieldValidator());

    expect(mockSetError).toHaveBeenCalledWith("password-check", {
      type: "validate",
      message: "비밀번호가 일치하지 않습니다."
    });
    expect(mockClearErrors).not.toHaveBeenCalled();
  });

  it("패스워드와 패스워드 확인 값이 같으면 clearErrors를 호출해야 합니다.", () => {
    const mockSetError = jest.fn();
    const mockClearErrors = jest.fn();

    mockUseFormContext.mockReturnValue({
      watch: jest.fn((name) => {
        if (name === "password") return "samePassword";
        if (name === "password-check") return "samePassword";
        return "";
      }),
      setError: mockSetError,
      clearErrors: mockClearErrors
    });

    renderHook(() => usePasswordChkFieldValidator());

    expect(mockClearErrors).toHaveBeenCalledWith("password-check");
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it("패스워드 또는 패스워드 확인 값의 길이가 8 미만이면 clearErrors를 호출해야 합니다.", () => {
    const mockSetError = jest.fn();
    const mockClearErrors = jest.fn();

    mockUseFormContext.mockReturnValue({
      watch: jest.fn((name) => {
        if (name === "password") return "short"; // 길이가 8 미만
        if (name === "password-check") return "short"; // 길이가 8 미만
        return "";
      }),
      setError: mockSetError,
      clearErrors: mockClearErrors
    });

    renderHook(() => usePasswordChkFieldValidator());

    act(() => {}); // useEffect 실행

    expect(mockClearErrors).toHaveBeenCalledWith("password-check");
    expect(mockSetError).not.toHaveBeenCalled();
  });
});
