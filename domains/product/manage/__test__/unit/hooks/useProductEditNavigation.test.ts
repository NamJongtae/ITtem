import { renderHook, act } from "@testing-library/react";
import useProductEditNavigation from "../../../hooks/useProductEditNavigation";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";

jest.mock("@/shared/common/hooks/useCustomRouter");

describe("useProductEditNavigation 훅 테스트", () => {
  const mockNavigate = jest.fn();
  const mockUseCustomRouter = useCustomRouter as jest.Mock;

  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCustomRouter.mockReturnValue({ navigate: mockNavigate });
  });

  it("goToProductEditPage 호출 시 navigate가 올바르게 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductEditNavigation({ productId })
    );

    act(() => {
      result.current.goToProductEditPage();
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      type: "push",
      url: `/product/${productId}/edit`
    });
  });
});
