import { renderHook } from "@testing-library/react";
import useBasicInfoNextBtnDisabled from "@/domains/auth/signup/hooks/basic-info-step/useBasicInfoNextBtnDisabled";
import { useFormContext } from "react-hook-form";
import useEmailVerificationStatus from "@/domains/auth/shared/email-verification/hooks/useEmailVerificationStatus";

jest.mock(
  "@/domains/auth/shared/email-verification/hooks/useEmailVerificationStatus"
);

jest.mock("react-hook-form");

describe("useBasicInfoNextBtnDisabled 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockUseEmailVerificationStatus =
    useEmailVerificationStatus as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("폼에 에러가 있는 경우 버튼은 비활성화되어야 한다", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {
          email: { message: "Invalid email" }
        },
        dirtyFields: {
          email: true,
          password: true,
          verificationCode: true
        }
      }
    });

    mockUseEmailVerificationStatus.mockReturnValue({ isVerifiedEmail: true });

    const { result } = renderHook(() => useBasicInfoNextBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });

  it("모든 필드가 수정되지 않은 경우 버튼은 비활성화되어야 한다", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {
          email: true,
          password: false,
          verificationCode: true
        }
      }
    });

    mockUseEmailVerificationStatus.mockReturnValue({ isVerifiedEmail: true });

    const { result } = renderHook(() => useBasicInfoNextBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });

  it("이메일이 인증되지 않은 경우 버튼은 비활성화되어야 한다", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {
          email: true,
          password: true,
          verificationCode: true
        }
      }
    });

    mockUseEmailVerificationStatus.mockReturnValue({ isVerifiedEmail: false });

    const { result } = renderHook(() => useBasicInfoNextBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });

  it("모든 조건이 충족된 경우 버튼은 활성화되어야 한다", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {
          email: true,
          password: true,
          verificationCode: true
        }
      }
    });

    mockUseEmailVerificationStatus.mockReturnValue({ isVerifiedEmail: true });

    const { result } = renderHook(() => useBasicInfoNextBtnDisabled());
    expect(result.current.isDisabled).toBe(false);
  });
});
