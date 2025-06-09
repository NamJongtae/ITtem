import { renderHook, act } from "@testing-library/react";
import useReturnReceiptConfirmationHandler from "../../../hooks/useReturnReceiptConfirmationHandler";
import useReturnReceiptComfirmationMutate from "../../../hooks/mutations/useReturnReceiptComfirmationMutate";

jest.mock("../../../hooks/mutations/useReturnReceiptComfirmationMutate");

describe("useReturnReceiptConfirmationHandler 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseReturnReceiptComfirmationMutate =
    useReturnReceiptComfirmationMutate as jest.Mock;
  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReturnReceiptComfirmationMutate.mockReturnValue({
      productReturnReceiptConfirmationMutate: mockMutate
    });
  });

  it("onClickReturnReceiptConfirmation 호출 시 confirm이 true이면 productReturnReceiptConfirmationMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useReturnReceiptConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnReceiptConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 환불 상품 인수 확인을 하겠어요?"
    );
    expect(mockMutate).toHaveBeenCalledWith(productId);
  });

  it("onClickReturnReceiptConfirmation 호출 시 confirm이 false이면 productReturnReceiptConfirmationMutate가 호출되지 않습니다.", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useReturnReceiptConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnReceiptConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 환불 상품 인수 확인을 하겠어요?"
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
