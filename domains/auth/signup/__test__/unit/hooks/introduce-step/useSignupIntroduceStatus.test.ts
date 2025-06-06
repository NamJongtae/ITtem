import { renderHook } from "@testing-library/react";
import { useSignupIntroduceStatus } from "@/domains/auth/signup/hooks/introduce-step/useSignupIntroduceStatus";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useSignupIntroduceStatus 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("에러가 없는 경우 errors는 에러를 반환하지않아야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {}
      }
    });

    const { result } = renderHook(() => useSignupIntroduceStatus());
    expect(result.current.errors).toBeFalsy();
  });

  it("introduce에 에러가 있는 경우 errors는 해당 에러를 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: { introduce: { message: "소개글은 100자 이하여야 합니다." } }
      }
    });

    const { result } = renderHook(() => useSignupIntroduceStatus());
    expect(result.current.errors).toEqual({
      message: "소개글은 100자 이하여야 합니다."
    });
  });
});
