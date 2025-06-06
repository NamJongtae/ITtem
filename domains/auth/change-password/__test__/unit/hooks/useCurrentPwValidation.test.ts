import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useCurrentPwValidation from "../../../hooks/useCurrentPwValidation";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("useCurrentPwValidation 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("watched된 비밀번호와 입력 값이 다르면 true를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      watch: jest.fn((fieldName: string) => {
        if (fieldName === "password") {
          return "testPassword";
        }
        return undefined; 
      })
    });

    const { result } = renderHook(() => useCurrentPwValidation());

    const { validatePassword } = result.current;

    expect(validatePassword("differentPassword")).toBe(true);
  });

  it("watched된 비밀번호와 입력 값이 같으면 에러 메시지 문자열을 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      watch: jest.fn((fieldName: string) => {
        if (fieldName === "password") {
          return "testPassword";
        }
        return undefined;
      })
    });

    const { result } = renderHook(() => useCurrentPwValidation());

    const { validatePassword } = result.current;

    expect(validatePassword("testPassword")).toBe(
      "현재 비밀번호와 변경할 비밀번호가 같습니다."
    );
  });
});
