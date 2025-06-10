import { renderHook } from "@testing-library/react";
import useProfileEditSubmitBtnDisabled from "../../../hooks/useProfileEditSubmitBtnDisabled";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProfileEditSubmitBtnDisabled", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("isDirty가 false인 경우 isDisabled은 ture가 됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        isDirty: false,
        errors: {}
      }
    });

    const { result } = renderHook(() => useProfileEditSubmitBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("isDirty가 true인 경우 profileImg or introduce or nickname 필드에 에러가 있으면 isDisabled은 ture가 됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        isDirty: true,
        errors: {
          nickname: { message: "에러 메시지" }
        }
      }
    });

    const { result } = renderHook(() => useProfileEditSubmitBtnDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("isDirty가 true이고 에러도 없으면 isDisabled은 false가 됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        isDirty: true,
        errors: {}
      }
    });

    const { result } = renderHook(() => useProfileEditSubmitBtnDisabled());

    expect(result.current.isDisabled).toBe(false);
  });
});
