import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useFindPasswordBtnDisabled from "../../../hooks/useFindPasswordBtnDisabled";
import useEmailVerificationStatus from "@/domains/auth/shared/email-verification/hooks/useEmailVerificationStatus";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

jest.mock(
  "@/domains/auth/shared/email-verification/hooks/useEmailVerificationStatus",
  () => ({
    __esModule: true,
    default: jest.fn()
  })
);

const mockUseFormContext = useFormContext as jest.Mock;
const mockUseEmailVerificationStatus = useEmailVerificationStatus as jest.Mock;

describe("useFindPasswordBtnDisabled 훅 테스트", () => {
  beforeEach(() => {
    mockUseFormContext.mockReset();
    mockUseEmailVerificationStatus.mockReset();
  });

  it("모든 필드가 dirty하고 에러가 없으며, 이메일이 인증되었을 때 버튼은 활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {
          email: true,
          password: true,
          "password-check": true,
          verificationCode: true
        }
      }
    });

    // useEmailVerificationStatus가 반환할 값 설정
    mockUseEmailVerificationStatus.mockReturnValue({
      isVerifiedEmail: true
    });

    // 훅 렌더링
    const { result } = renderHook(() => useFindPasswordBtnDisabled());

    // isDisabled가 false인지 확인 (활성화 상태)
    expect(result.current.isDisabled).toBe(false);
  });

  it("하나 이상의 필드에 에러가 있을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {
          email: { type: "required", message: "이메일이 필요합니다." }
        },
        dirtyFields: {
          email: true,
          password: true,
          "password-check": true,
          verificationCode: true
        }
      }
    });

    // useEmailVerificationStatus가 반환할 값 설정
    mockUseEmailVerificationStatus.mockReturnValue({
      isVerifiedEmail: true
    });

    // 훅 렌더링
    const { result } = renderHook(() => useFindPasswordBtnDisabled());

    // isDisabled가 true인지 확인 (비활성화 상태)
    expect(result.current.isDisabled).toBe(true);
  });

  it("모든 필드가 dirty하지 않을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    // useEmailVerificationStatus가 반환할 값 설정
    mockUseEmailVerificationStatus.mockReturnValue({
      isVerifiedEmail: true
    });

    // 훅 렌더링
    const { result } = renderHook(() => useFindPasswordBtnDisabled());

    // isDisabled가 true인지 확인 (비활성화 상태)
    expect(result.current.isDisabled).toBe(true);
  });

  it("이메일이 인증되지 않았을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {
          email: true,
          password: true,
          "password-check": true,
          verificationCode: true
        }
      }
    });

    // useEmailVerificationStatus가 반환할 값 설정 (이메일 인증되지 않음)
    mockUseEmailVerificationStatus.mockReturnValue({
      isVerifiedEmail: false
    });

    // 훅 렌더링
    const { result } = renderHook(() => useFindPasswordBtnDisabled());

    // isDisabled가 true인지 확인 (비활성화 상태)
    expect(result.current.isDisabled).toBe(true);
  });
});
