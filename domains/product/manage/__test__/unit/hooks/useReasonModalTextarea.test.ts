import { renderHook } from "@testing-library/react";
import useReasonModalTextarea from "../../../hooks/useReasonModalTextarea";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

describe("useReasonModalTextarea 훅 테스트", () => {
  const mockRef = jest.fn();

  const mockRegisterResult = {
    ref: mockRef,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: "textareaReason"
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue(mockRegisterResult),
      watch: jest.fn().mockReturnValue("직접입력") // 선택된 값
    });
  });

  it("register가 textarea{name}으로 호출되고 ref, 나머지 값들이 올바르게 분리되는지 합니다.", () => {
    const { result } = renderHook(() =>
      useReasonModalTextarea({ name: "Reason" })
    );

    // 반환값 확인
    expect(result.current.registerRef).toBe(mockRef);
    expect(result.current.rest).toEqual({
      onChange: mockRegisterResult.onChange,
      onBlur: mockRegisterResult.onBlur,
      name: mockRegisterResult.name
    });
  });

  it("watch(name)이 호출되어 선택값을 반환하는지 확인합니다.", () => {
    const { result } = renderHook(() =>
      useReasonModalTextarea({ name: "Reason" })
    );

    expect(useFormContext().watch).toHaveBeenCalledWith("Reason");
    expect(result.current.selectValue).toBe("직접입력");
  });
});
