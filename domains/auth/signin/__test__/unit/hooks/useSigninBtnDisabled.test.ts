import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useSigninBtnDisabled from "../../../hooks/useSigninBtnDisabled";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("useSigninBtnDisabled 훅 테스트", () => {
  beforeEach(() => {
    mockUseFormContext.mockReset();
  });

  it("에러가 없고 이메일 및 패스워드 필드가 dirty할 때 isDisabled는 false여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {}, 
        dirtyFields: {
          email: true,
          password: true
        }
      }
    });

    const { result } = renderHook(() => useSigninBtnDisabled());

    expect(result.current.isDisabled).toBe(false);
  });

  it("하나 이상의 필수 필드에 에러가 있을 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {
          email: { type: "required", message: "이메일 필요" }
        },
        dirtyFields: {
          email: true,
          password: true
        }
      }
    });

    const { result } = renderHook(() => useSigninBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("필수 필드 중 하나라도 dirty하지 않을 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {}, 
        dirtyFields: {
          email: true
        }
      }
    });

    const { result } = renderHook(() => useSigninBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("에러가 있고 필수 필드 중 하나라도 dirty하지 않을 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {
          email: { type: "required", message: "이메일 필요" }
        },
        dirtyFields: {
          email: true
        }
      }
    });

    const { result } = renderHook(() => useSigninBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("에러가 없고 필수 필드 모두 dirty하지 않을 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    const { result } = renderHook(() => useSigninBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });
});
