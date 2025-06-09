import { renderHook } from "@testing-library/react";
import useReasonSubmitDisabled from "../../../hooks/useReasonSubmitDisabled";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

describe("useReasonSubmitDisabled 훅 테스트", () => {
  const mockWatch = jest.fn();

  const getUseFormContextMock = (options: {
    isDirty?: boolean;
    errors?: Record<string, any>;
    dirtyFields?: Record<string, boolean>;
    selectValue?: string;
  }) => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isDirty: options.isDirty ?? true,
        errors: options.errors ?? {},
        dirtyFields: options.dirtyFields ?? {}
      },
      watch: mockWatch.mockReturnValue(options.selectValue ?? "")
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 조건이 충족되면 isDisabled는 false여야 합니다.", () => {
    getUseFormContextMock({
      isDirty: true,
      errors: {},
      dirtyFields: { textareaReason: true },
      selectValue: "직접입력"
    });

    const { result } = renderHook(() =>
      useReasonSubmitDisabled({ name: "Reason" })
    );

    expect(result.current.isDisabled).toBe(false);
  });

  it("isDirty가 false이면 isDisabled는 true여야 합니다.", () => {
    getUseFormContextMock({
      isDirty: false,
      errors: {},
      dirtyFields: {},
      selectValue: "단순변심"
    });

    const { result } = renderHook(() =>
      useReasonSubmitDisabled({ name: "Reason" })
    );

    expect(result.current.isDisabled).toBe(true);
  });

  it("errors가 존재하면 isDisabled는 true여야 합니다.", () => {
    getUseFormContextMock({
      isDirty: true,
      errors: { Reason: { message: "필수 항목입니다" } },
      dirtyFields: {},
      selectValue: "단순변심"
    });

    const { result } = renderHook(() =>
      useReasonSubmitDisabled({ name: "Reason" })
    );

    expect(result.current.isDisabled).toBe(true);
  });

  it("selectValue가 직접입력 일 때 textarea가 dirty하지 않으면 isDisabled는 true여야 합니다.", () => {
    getUseFormContextMock({
      isDirty: true,
      errors: {},
      dirtyFields: {},
      selectValue: "직접입력"
    });

    const { result } = renderHook(() =>
      useReasonSubmitDisabled({ name: "Reason" })
    );

    expect(result.current.isDisabled).toBe(true);
  });
});
