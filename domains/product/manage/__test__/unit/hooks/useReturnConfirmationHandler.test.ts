import { renderHook, act } from "@testing-library/react";
import useReturnConfirmationHandler from "../../../hooks/useReturnConfirmationHandler";
import useReturnConfirmationMutate from "../../../hooks/mutations/useReturnConfirmationMutate";

jest.mock("../../../hooks/mutations/useReturnConfirmationMutate");

describe("useReturnConfirmationHandler 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseReturnConfirmationMutate =
    useReturnConfirmationMutate as jest.Mock;
  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReturnConfirmationMutate.mockReturnValue({
      productReturnConfirmationMutate: mockMutate
    });
  });

  it("onClickReturnConfirmation 호출 시 confirm이 true일 경우 productReturnConfirmationMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useReturnConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 상품 반품 요청을 확인 하겠어요?"
    );
    expect(mockMutate).toHaveBeenCalledWith(productId);
  });

  it("onClickReturnConfirmation 호출 시 confirm이 false일 경우 productReturnConfirmationMutate가 호출되지 않습니다.", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useReturnConfirmationHandler({ productId })
    );

    act(() => {
      result.current.onClickReturnConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 상품 반품 요청을 확인 하겠어요?"
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
