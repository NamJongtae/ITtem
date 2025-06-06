import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useCheckDisabledBtn from "../../../hooks/useCheckDisabledBtn";


jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));


const mockUseFormContext = useFormContext as jest.Mock;

describe("useCheckDisabledBtn 훅 테스트", () => {
  beforeEach(() => {
    mockUseFormContext.mockReset();
  });

  it("폼 필드가 전혀 dirty하지 않고 에러도 없을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {},
        errors: {}
      }
    });

    const { result } = renderHook(() => useCheckDisabledBtn());

    expect(result.current.isDisabled).toBe(true);
  });

  it("필수 필드 중 일부만 dirty하고 에러가 없을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          "current-password": true
        },
        errors: {}
      }
    });

    const { result } = renderHook(() => useCheckDisabledBtn());

    expect(result.current.isDisabled).toBe(true);
  });

  it("모든 필수 필드가 dirty하지만 하나 이상의 필수 필드에 에러가 있을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          "current-password": true,
          password: true,
          "password-check": true 
        },
        errors: {
          password: { type: "minLength", message: "Too short" }
        }
      }
    });

    const { result } = renderHook(() => useCheckDisabledBtn());

    expect(result.current.isDisabled).toBe(true);
  });

  it("모든 필수 필드가 dirty하고 에러가 전혀 없을 때 버튼은 활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          "current-password": true,
          password: true,
          "password-check": true 
        },
        errors: {} 
      }
    });

    const { result } = renderHook(() => useCheckDisabledBtn());

    expect(result.current.isDisabled).toBe(false);
  });

  it("필수 필드 중 일부만 dirty하고 에러가 있을 때 버튼은 비활성화 상태여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          "current-password": true
        },
        errors: {
          "current-password": { type: "required", message: "Required" }
        }
      }
    });

    const { result } = renderHook(() => useCheckDisabledBtn());
    
    expect(result.current.isDisabled).toBe(true);
  });
});
