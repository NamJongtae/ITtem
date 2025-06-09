import { renderHook, act } from "@testing-library/react";
import useReviewTagToggle from "../../../hooks/useReviewTagToggle";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useReviewTagToggle 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockWatch = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      setValue: mockSetValue,
      watch: mockWatch
    });
  });

  it("watch로부터 tags 값을 반환하는지 확인합니다.", () => {
    mockWatch.mockReturnValue([1, 0, 1]);

    const { result } = renderHook(() => useReviewTagToggle());

    expect(result.current.tags).toEqual([1, 0, 1]);
  });

  it("onChangeCheckbox 호출 시 해당 인덱스 값이 토글되고 setValue 호출되는지 확인합니다.", () => {
    mockWatch.mockReturnValue([1, 0, 1]);

    const { result } = renderHook(() => useReviewTagToggle());

    act(() => {
      result.current.onChangeCheckbox(1); // index 1 → 0 → 1
    });

    expect(mockSetValue).toHaveBeenCalledWith("tags", [1, 1, 1], {
      shouldDirty: true,
      shouldValidate: true
    });
  });

  it("onChangeCheckbox 호출 시 값이 1에서 0으로 토글되는지 확인합니다.", () => {
    mockWatch.mockReturnValue([1, 1, 0]);

    const { result } = renderHook(() => useReviewTagToggle());

    act(() => {
      result.current.onChangeCheckbox(0); // index 0 → 1 → 0
    });

    expect(mockSetValue).toHaveBeenCalledWith("tags", [0, 1, 0], {
      shouldDirty: true,
      shouldValidate: true
    });
  });
});
