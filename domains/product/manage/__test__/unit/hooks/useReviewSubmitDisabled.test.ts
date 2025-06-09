import { renderHook } from "@testing-library/react";
import useReviewSubmitDisabled from "../../../hooks/useReviewSubmitDisabled";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useReviewSubmitDisabled 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("score와 content 둘 다 dirty일 때 isDisabled는 false여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          score: true,
          content: true
        }
      }
    });

    const { result } = renderHook(() => useReviewSubmitDisabled());

    expect(result.current.isDisabled).toBe(false);
  });

  it("score만 dirty일 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          score: true,
          content: false
        }
      }
    });

    const { result } = renderHook(() => useReviewSubmitDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("content만 dirty일 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {
          score: false,
          content: true
        }
      }
    });

    const { result } = renderHook(() => useReviewSubmitDisabled());

    expect(result.current.isDisabled).toBe(true);
  });

  it("둘 다 dirty가 아닐 때 isDisabled는 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        dirtyFields: {}
      }
    });

    const { result } = renderHook(() => useReviewSubmitDisabled());

    expect(result.current.isDisabled).toBe(true);
  });
});
