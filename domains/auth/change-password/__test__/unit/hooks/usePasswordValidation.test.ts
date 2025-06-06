import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import usePasswordValidation from "../../../hooks/usePasswordValidation";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERRORMSG
} from "@/domains/auth/shared/common/constants/constansts";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("usePasswordValidation 훅 테스트", () => {
  beforeEach(() => {
    mockUseFormContext.mockReset();
  });

  it("validatePassword 함수는 현재 비밀번호와 입력 값이 다르면 true를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      watch: jest.fn((fieldName) => {
        if (fieldName === "current-password") {
          return "currentPassword123";
        }
        return undefined;
      })
    });

    const { result } = renderHook(() => usePasswordValidation());

    expect(result.current.validatePassword("newPassword456")).toBe(true);
  });

  it("validatePassword 함수는 현재 비밀번호와 입력 값이 같으면 에러 메시지를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      watch: jest.fn((fieldName) => {
        if (fieldName === "current-password") {
          return "samePassword";
        }
        return undefined;
      })
    });

    const { result } = renderHook(() => usePasswordValidation());

    expect(result.current.validatePassword("samePassword")).toBe(
      "현재 비밀번호와 변경할 비밀번호가 같습니다."
    );
  });

  it("PASSWORD_REGEX와 PASSWORD_REGEX_ERRORMSG를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      watch: jest.fn()
    });

    const { result } = renderHook(() => usePasswordValidation());

    expect(result.current.PASSWORD_REGEX).toBe(PASSWORD_REGEX);
    expect(result.current.PASSWORD_REGEX_ERRORMSG).toBe(
      PASSWORD_REGEX_ERRORMSG
    );
  });
});
