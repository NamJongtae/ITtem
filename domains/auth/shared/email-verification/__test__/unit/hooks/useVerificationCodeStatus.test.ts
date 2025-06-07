import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useVerificationCodeStatus from "../../../hooks/useVerificationCodeStatus";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

describe("useVerificationCodeStatus 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("verificationCode가 수정되지 않았다면 isDirty는 false를 반환합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          verificationCode: false
        },
        errors: {}
      }
    });

    const { result } = renderHook(() => useVerificationCodeStatus());

    expect(result.current.isDirty).toBe(false);
  });

  it("verificationCode가 에러를 반환하면 errors도 에러를 반환합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          verificationCode: false
        },
        errors: {
          verificationCode: {
            type: "verification",
            message: "인증 코드가 일치하지 않습니다."
          }
        }
      }
    });

    const { result } = renderHook(() => useVerificationCodeStatus());

    expect(result.current.errors).toEqual({
      type: "verification",
      message: "인증 코드가 일치하지 않습니다."
    });
  });
});
