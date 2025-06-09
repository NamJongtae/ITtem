import { renderHook, act } from "@testing-library/react";
import useCancelWithdrawalHandler from "../../../hooks/useCancelWithdrawalHandler";
import usePurchaseCancelRequestWithdrawalMutate from "../../../hooks/mutations/usePurchaseCancelRequestWithdrawalMutate";

jest.mock("../../../hooks/mutations/usePurchaseCancelRequestWithdrawalMutate");

describe("useCancelWithdrawalHandler 훅 테스트", () => {
  const mockPurchaseCancelRequestWithdrawalMutate = jest.fn();
  const mockUsePurchaseCancelRequestWithdrawalMutate =
    usePurchaseCancelRequestWithdrawalMutate as jest.Mock;

  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();

    mockUsePurchaseCancelRequestWithdrawalMutate.mockReturnValue({
      purchaseCancelRequestWithdrawalMutate:
        mockPurchaseCancelRequestWithdrawalMutate
    });
  });

  it("onClickCancelWithdrawal 호출 시 confirm이 true일 경우 purchaseCancelRequestWithdrawalMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useCancelWithdrawalHandler({ productId })
    );

    act(() => {
      result.current.onClickCancelWithdrawal();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 취소 요청을 철회 하겠어요?"
    );
    expect(mockPurchaseCancelRequestWithdrawalMutate).toHaveBeenCalledWith(
      productId
    );
  });

  it("onClickCancelWithdrawal 호출 시 confirm이 false일 경우 purchaseCancelRequestWithdrawalMutate가 호출되지 않습니다.", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useCancelWithdrawalHandler({ productId })
    );

    act(() => {
      result.current.onClickCancelWithdrawal();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 취소 요청을 철회 하겠어요?"
    );
    expect(mockPurchaseCancelRequestWithdrawalMutate).not.toHaveBeenCalled();
  });
});
