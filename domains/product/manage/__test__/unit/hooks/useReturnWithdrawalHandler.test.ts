import { renderHook, act } from "@testing-library/react";
import useReturnWithdrawalHandler from "../../../hooks/useReturnWithdrawalHandler";
import useProductReturnRequestWithdrawalMutate from "../../../hooks/mutations/useProductReturnRequestWithdrawalMutate";

jest.mock("../../../hooks/mutations/useProductReturnRequestWithdrawalMutate");

describe("useReturnWithdrawalHandler 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseReturnWithdrawalMutate =
    useProductReturnRequestWithdrawalMutate as jest.Mock;
  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReturnWithdrawalMutate.mockReturnValue({
      productReturnRequestWithdrawalMutate: mockMutate
    });
  });

  it("onClickReturnWithdrawal 호출 시 confirm이 true이면 productReturnRequestWithdrawalMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useReturnWithdrawalHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnWithdrawal();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 상품 반품 요청을 철회 하겠어요?"
    );
    expect(mockMutate).toHaveBeenCalledWith(productId);
  });

  it("onClickReturnWithdrawal 호출 시 confirm이 false이면 productReturnRequestWithdrawalMutate가 호출되지 않습니다.", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useReturnWithdrawalHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnWithdrawal();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 상품 반품 요청을 철회 하겠어요?"
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
