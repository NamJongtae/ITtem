import { renderHook } from "@testing-library/react";
import useReviewRegisterTags from "../../../hooks/useReviewRegisterTags";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useReviewRegisterTags 훅 테스트", () => {
  const mockRegister = jest.fn();
  const mockUnregister = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      register: mockRegister,
      unregister: mockUnregister
    });
  });

  it("mount 시 register('tags')가 호출됩니다.", () => {
    renderHook(() => useReviewRegisterTags());

    expect(mockRegister).toHaveBeenCalledWith("tags");
  });

  it("unmount 시 unregister('tags')가 호출됩니다.", () => {
    const { unmount } = renderHook(() => useReviewRegisterTags());

    unmount();

    expect(mockUnregister).toHaveBeenCalledWith("tags");
  });
});
