import { renderHook } from "@testing-library/react";
import { useSignupBasictInfoStatus } from "@/domains/auth/signup/hooks/basic-info-step/useSignupBasicInfoStatus";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useSignupBasictInfoStatus 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("이메일과 비밀번호가 dirty이면 isDirty는 true, errors가 없는 경우 errors false를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: true,
          password: true
        },
        errors: {}
      }
    });

    const { result } = renderHook(() => useSignupBasictInfoStatus());
    expect(result.current.isDirty).toBe(true);
    expect(result.current.errors).toBeUndefined();
  });

  it("이메일 또는 비밀번호 중 하나라도 dirty하지 않으면 isDirty는 false를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: true,
          password: false
        },
        errors: {}
      }
    });

    const { result } = renderHook(() => useSignupBasictInfoStatus());
    expect(result.current.isDirty).toBe(false);
  });

  it("이메일에 에러가 있는 경우 errors는 해당 에러를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: true,
          password: true
        },
        errors: {
          email: { message: "이메일 형식이 올바르지 않습니다." }
        }
      }
    });

    const { result } = renderHook(() => useSignupBasictInfoStatus());
    expect(result.current.errors).toEqual({
      message: "이메일 형식이 올바르지 않습니다."
    });
  });

  it("비밀번호에 에러가 있는 경우 errors는 해당 에러를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          email: true,
          password: true
        },
        errors: {
          password: { message: "비밀번호가 너무 짧습니다." }
        }
      }
    });

    const { result } = renderHook(() => useSignupBasictInfoStatus());
    expect(result.current.errors).toEqual({
      message: "비밀번호가 너무 짧습니다."
    });
  });
});
