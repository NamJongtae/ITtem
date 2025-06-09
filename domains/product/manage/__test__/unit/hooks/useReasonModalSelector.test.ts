import { renderHook } from "@testing-library/react";
import useReasonModalSelector from "../../../hooks/useReasonModalSelector";
import * as reactHookForm from "react-hook-form";
import { useFocusing } from "@/shared/common/hooks/useFocusing";

// 모듈 mocking
jest.mock("react-hook-form");
jest.mock("@/shared/common/hooks/useFocusing");

describe("useReasonModalSelector 훅 테스트", () => {
  const mockRef = jest.fn();
  const selectorRef = { current: null };
  const mockUseFocsing = useFocusing as jest.Mock;
  const mockRegisterReturn = {
    ref: mockRef,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: "reason"
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (reactHookForm.useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue(mockRegisterReturn)
    });
  });

  it("register가 주어진 name으로 호출되고 반환값을 분리해주는지 확인", () => {
    const { result } = renderHook(() =>
      useReasonModalSelector({ name: "reason", selectorRef })
    );

    expect(reactHookForm.useFormContext).toHaveBeenCalled();

    // 반환값이 정확히 분리되었는지 확인
    expect(result.current.ref).toBe(mockRef);
    expect(result.current.rest).toEqual({
      onChange: mockRegisterReturn.onChange,
      onBlur: mockRegisterReturn.onBlur,
      name: mockRegisterReturn.name
    });
  });

  it("useFocusing이 selectorRef를 사용해 호출되는지 확인합니다.", () => {
    renderHook(() => useReasonModalSelector({ name: "reason", selectorRef }));

    expect(mockUseFocsing).toHaveBeenCalledWith(selectorRef);
  });
});
