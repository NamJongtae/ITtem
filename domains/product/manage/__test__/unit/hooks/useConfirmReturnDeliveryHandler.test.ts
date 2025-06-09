import { renderHook, act } from "@testing-library/react";
import useConfirmReturnDeliveryHandler from "../../../hooks/useConfirmReturnDeliveryHandler";
import useProductReturnDeliveryConfirmationMutate from "../../../hooks/mutations/useProductReturnDeliveryConfirmationMutate";

jest.mock(
  "../../../hooks/mutations/useProductReturnDeliveryConfirmationMutate"
);

describe("useConfirmReturnDeliveryHandler 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseProductReturnDeliveryConfirmationMutate =
    useProductReturnDeliveryConfirmationMutate as jest.Mock;

  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProductReturnDeliveryConfirmationMutate.mockReturnValue({
      productReturnDeliveryConfirmationMutate: mockMutate
    });
  });

  it("onClickReturnDeliveryConfirmation 호출 시 confirm이 true일 경우 productReturnDeliveryConfirmationMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useConfirmReturnDeliveryHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnDeliveryConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 반품 상품 전달 확인을 하겠어요?"
    );
    expect(mockMutate).toHaveBeenCalledWith(productId);
  });

  it("onClickReturnDeliveryConfirmation 호출 시 confirm이 false일 경우 productReturnDeliveryConfirmationMutate가 호출되지 않습니다.", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useConfirmReturnDeliveryHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnDeliveryConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 반품 상품 전달 확인을 하겠어요?"
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
