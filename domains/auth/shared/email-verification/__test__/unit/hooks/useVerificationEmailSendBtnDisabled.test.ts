import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useVerificationEmailSendBtnDisabled from "../../../hooks/useVerificationEmailSendBtnDisabled";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

describe("useVerificationEmailSendBtnDisabled 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("email이 수정되었고 에러가 없는경우 isDisabled는 false를 반환합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: true
        },
        errors: {}
      }
    });

    const { result } = renderHook(() => useVerificationEmailSendBtnDisabled());

    expect(result.current.isDisabled).toBe(false);
  });

  it("email 수정되지 않았다면 isDisabled는 true를 반환합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: false
        },
        errors: {}
      }
    });

    const { result } = renderHook(() => useVerificationEmailSendBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("에러가 있는경우 isDisabled는 true를 반환합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: false
        },
        errors: {
          email: {
            type: "validate",
            message: "이메일 형식이 아닙니다."
          }
        }
      }
    });

    const { result } = renderHook(() => useVerificationEmailSendBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });
});
