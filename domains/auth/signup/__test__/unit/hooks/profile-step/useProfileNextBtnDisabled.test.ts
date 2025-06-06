import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useProfileNextBtnDisabled from "@/domains/auth/signup/hooks/profile-step/useProfileNextBtnDisabled";

jest.mock("react-hook-form");

describe("useProfileNextBtnDisabled 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("nickname 필드가 dirty이고 오류가 없으면 버튼이 활성화됩니다.", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: { nickname: true },
        errors: {}
      }
    });

    const { result } = renderHook(() => useProfileNextBtnDisabled());
    expect(result.current.isDisabled).toBe(false);
  });

  it("nickname 필드에 오류가 있으면 버튼이 비활성화됩니다.", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: { nickname: true },
        errors: { nickname: { message: "닉네임은 필수입니다." } }
      }
    });

    const { result } = renderHook(() => useProfileNextBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });

  it("nickname 필드가 dirty하지 않으면 버튼이 비활성화됩니다.", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: {},
        errors: {}
      }
    });

    const { result } = renderHook(() => useProfileNextBtnDisabled());
    expect(result.current.isDisabled).toBe(true);
  });
});
