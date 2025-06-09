import { renderHook, act } from "@testing-library/react";
import useCancelConfirmationHandler from "../../../hooks/useCancelConfirmationHandler";
import useCancelConfirmationMutate from "../../../hooks/mutations/useCancelConfirmationMutate";

jest.mock("../../../hooks/mutations/useCancelConfirmationMutate");

describe("useCancelConfirmationHandler 훅 테스트", () => {
  const mockPurchaseCancelConfirmationMutate = jest.fn();
  const mockUseCancelConfirmationMutate =
    useCancelConfirmationMutate as jest.Mock;

  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCancelConfirmationMutate.mockReturnValue({
      purchaseCancelConfirmationMutate: mockPurchaseCancelConfirmationMutate
    });
  });

  it("onClickCancelConfirmation 호출 시 confirm이 true일 경우 purchaseCancelConfirmationMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useCancelConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickCancelConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 취소 요청을 확인 하겠어요?"
    );
    expect(mockPurchaseCancelConfirmationMutate).toHaveBeenCalledWith(
      productId
    );
  });

  it("onClickCancelConfirmation 호출 시 confirm이 false일 경우 purchaseCancelConfirmationMutate가 호출되지 않습니다.", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useCancelConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickCancelConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 취소 요청을 확인 하겠어요?"
    );
    expect(mockPurchaseCancelConfirmationMutate).not.toHaveBeenCalled();
  });
});
