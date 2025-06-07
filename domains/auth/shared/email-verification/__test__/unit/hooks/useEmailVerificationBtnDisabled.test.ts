import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useEmailVerificationBtnDisabled from "../../../hooks/useEmailVerificationBtnDisabled";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

describe("useEmailVerificationBtnDisabled 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    mockUseFormContext.mockReset();
  });

  it("verificationCode에 에러가 없고 dirty일 때 버튼이 비활성화됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {
          verificationCode: true
        }
      }
    });

    const { result } = renderHook(() => useEmailVerificationBtnDisabled());
    expect(result.current.isDisabled).toBe(false);
  });

  it("verificationCode에 에러가 있을 때 버튼이 비활성화됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {
          verificationCode: {
            type: "required",
            message: "인증 코드를 입력하세요"
          }
        },
        dirtyFields: {
          verificationCode: true
        }
      }
    });

    const { result } = renderHook(() => useEmailVerificationBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });

  it("verificationCode가 dirty하지 않을 때 버튼 비활성화됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    const { result } = renderHook(() => useEmailVerificationBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });
});
