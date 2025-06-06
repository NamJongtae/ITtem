import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useSignupProfileStatus } from "@/domains/auth/signup/hooks/profile-step/useSignupProfileStatus";

jest.mock("react-hook-form");

describe("useSignupProfileStatus 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("nickname이 dirty인 경우 isDirty는 true 에러가 없을 경우 undefined가 됩니다. ", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: { nickname: true },
        errors: {}
      }
    });

    const { result } = renderHook(() => useSignupProfileStatus());
    expect(result.current.isDirty).toBe(true);
    expect(result.current.errors).toBeUndefined();
  });

  it("nickname이 dirty하지 않은 경우 isDirty는 false가 됩니다.", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: {},
        errors: {}
      }
    });

    const { result } = renderHook(() => useSignupProfileStatus());
    expect(result.current.isDirty).toBeUndefined();
    expect(result.current.errors).toBeUndefined();
  });

  it("profileImg에 에러가 있는 경우 해당 에러가 반환됩니다.", () => {
    const profileImgError = { message: "이미지를 업로드해주세요." };

    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: { nickname: true },
        errors: {
          profileImg: profileImgError
        }
      }
    });

    const { result } = renderHook(() => useSignupProfileStatus());
    expect(result.current.errors).toBe(profileImgError);
  });

  it("nickname에 에러가 있는 경우 해당 에러가 반환됩니다.", () => {
    const nicknameError = { message: "닉네임은 필수입니다." };

    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: { nickname: true },
        errors: {
          nickname: nicknameError
        }
      }
    });

    const { result } = renderHook(() => useSignupProfileStatus());
    expect(result.current.errors).toBe(nicknameError);
  });

  it("profileImg와 nickname에 모두 에러가 있는 경우 profileImg 우선 반환됩니다.", () => {
    const profileImgError = { message: "이미지를 업로드해주세요." };
    const nicknameError = { message: "닉네임을 입력해주세요." };

    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        dirtyFields: { nickname: true },
        errors: {
          profileImg: profileImgError,
          nickname: nicknameError
        }
      }
    });

    const { result } = renderHook(() => useSignupProfileStatus());
    expect(result.current.errors).toBe(profileImgError);
  });
});
