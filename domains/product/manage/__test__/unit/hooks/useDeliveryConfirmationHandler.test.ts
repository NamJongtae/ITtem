import { renderHook, act } from "@testing-library/react";
import useDeliveryConfirmationHandler from "../../../hooks/useDeliveryConfirmationHandler";
import useDeliveryConfirmationMutate from "../../../hooks/mutations/useDeliveryConfirmationMutate";

jest.mock("../../../hooks/mutations/useDeliveryConfirmationMutate");

describe("useDeliveryConfirmationHandler 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseDeliveryConfirmationMutate =
    useDeliveryConfirmationMutate as jest.Mock;
  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDeliveryConfirmationMutate.mockReturnValue({
      productDeliveryConfirmationMutate: mockMutate
    });
  });

  it("onClickDeliveryConfirmation 호출 시 confirm이 true일 경우 productDeliveryConfirmationMutate가 호출된다", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useDeliveryConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickDeliveryConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 상품 전달 확인을 하겠어요?"
    );
    expect(mockMutate).toHaveBeenCalledWith(productId);
  });

  it("onClickDeliveryConfirmation 호출 시 confirm이 false일 경우 productDeliveryConfirmationMutate가 호출되지 않는다", () => {
    window.confirm = jest.fn(() => false);
    const { result } = renderHook(() =>
      useDeliveryConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickDeliveryConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 상품 전달 확인을 하겠어요?"
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
