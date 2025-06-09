import { renderHook } from "@testing-library/react";
import useReviewModalStar from "../../../hooks/useReviewModalStar";
import { useFormContext } from "react-hook-form";
import { useFocusing } from "@/shared/common/hooks/useFocusing";

jest.mock("react-hook-form");
jest.mock("@/shared/common/hooks/useFocusing");

describe("useReviewModalStar 훅 테스트", () => {
  const mockWatch = jest.fn();
  const mockControl = { mock: "control" };
  const mockUseFocusing = useFocusing as jest.Mock;
  const mockUseFormContext = useFormContext as jest.Mock;

  const starRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      control: mockControl,
      watch: mockWatch
    });
  });

  it("useFormContext에서 control과 score를 반환하고 useFocusing이 호출됩니다.", () => {
    mockWatch.mockReturnValue(4);

    const { result } = renderHook(() => useReviewModalStar({ starRef }));

    expect(mockUseFocusing).toHaveBeenCalledWith(starRef);
    expect(result.current.control).toEqual(mockControl);
    expect(result.current.score).toBe(4);
  });
});
