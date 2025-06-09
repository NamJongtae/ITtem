import { renderHook, act } from "@testing-library/react";
import useReviewModalTags from "../../../hooks/useReviewModalTags";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useReviewModalTags 훅 테스트", () => {
  const mockRegister = jest.fn();
  const mockUnregister = jest.fn();
  const mockSetValue = jest.fn();
  const mockWatch = jest.fn();

  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseFormContext.mockReturnValue({
      register: mockRegister,
      unregister: mockUnregister,
      setValue: mockSetValue,
      watch: mockWatch
    });
  });

  it("초기 mount 시 register 호출되고, unmount 시 unregister 호출됩니다.", () => {
    const unmount = renderHook(() => useReviewModalTags()).unmount;

    expect(mockRegister).toHaveBeenCalledWith("tags");

    unmount();

    expect(mockUnregister).toHaveBeenCalledWith("tags");
  });

  it("handleCheckboxChange 호출 시 해당 index의 값을 토글하고 setValue 호출합니다.", () => {
    mockWatch.mockReturnValue([0, 1, 0]); // 초기 tags

    const { result } = renderHook(() => useReviewModalTags());

    act(() => {
      result.current.handleCheckboxChange(1); // 1 → 0으로 바뀜
    });

    expect(mockSetValue).toHaveBeenCalledWith("tags", [0, 0, 0], {
      shouldDirty: true,
      shouldValidate: true
    });

    act(() => {
      result.current.handleCheckboxChange(2); // 0 → 1로 바뀜
    });

    expect(mockSetValue).toHaveBeenCalledWith("tags", [0, 1, 1], {
      shouldDirty: true,
      shouldValidate: true
    });
  });

  it("현재 tags 값을 반환합니다.", () => {
    const mockTags = [1, 0, 1];
    mockWatch.mockReturnValue(mockTags);

    const { result } = renderHook(() => useReviewModalTags());

    expect(result.current.tags).toEqual(mockTags);
  });
});
