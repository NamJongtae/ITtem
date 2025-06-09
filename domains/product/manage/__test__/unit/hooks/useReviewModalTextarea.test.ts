import { renderHook } from "@testing-library/react";
import useReviewModalTextarea from "../../../hooks/useReviewModalTextarea";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useReviewModalTextarea 훅 테스트", () => {
  const mockRegister = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      register: mockRegister
    });
  });

  it("register('content')가 호출되고 ref와 나머지 속성이 분리되어 반환됩니다.", () => {
    const dummyRef = jest.fn();
    const dummyRegisterResult = {
      ref: dummyRef,
      name: "content",
      onChange: jest.fn(),
      onBlur: jest.fn()
    };

    mockRegister.mockReturnValue(dummyRegisterResult);

    const { result } = renderHook(() => useReviewModalTextarea());

    expect(mockRegister).toHaveBeenCalledWith("content", { required: true });

    expect(result.current.registerRef).toBe(dummyRef);
    expect(result.current.rest).toEqual({
      name: "content",
      onChange: dummyRegisterResult.onChange,
      onBlur: dummyRegisterResult.onBlur
    });
  });
});
