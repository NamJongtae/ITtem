import { renderHook, act } from "@testing-library/react";
import usePurchaseRequestConfirmationHandler from "../../../hooks/usePurchaseRequestConfirmationHandler";
import usePurchaseRequestConfirmationMutate from "../../../hooks/mutations/usePurchaseRequestConfirmationMutate";

jest.mock("../../../hooks/mutations/usePurchaseRequestConfirmationMutate");

describe("usePurchaseRequestConfirmationHandler 훅 테스트", () => {
  const mutateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePurchaseRequestConfirmationMutate as jest.Mock).mockReturnValue({
      purchaseRequestConfirmationMutate: mutateMock
    });
  });

  it("onClickPurchaseRequestConfirmation 호출 시 confirm에서 '확인'을 누르면 mutate가 호출되어야 합니다.", () => {
    jest.spyOn(window, "confirm").mockReturnValue(true);

    const { result } = renderHook(() =>
      usePurchaseRequestConfirmationHandler({ productId: "prod-001" })
    );

    act(() => {
      result.current.onClickPurchaseRequestConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 구매 요청을 확인 하겠어요?"
    );
    expect(mutateMock).toHaveBeenCalledWith("prod-001");
  });

  it("onClickPurchaseRequestConfirmation 호출 시 confirm에서 '취소'를 누르면 mutate가 호출되지 않아야 합니다.", () => {
    jest.spyOn(window, "confirm").mockReturnValue(false);

    const { result } = renderHook(() =>
      usePurchaseRequestConfirmationHandler({ productId: "prod-002" })
    );

    act(() => {
      result.current.onClickPurchaseRequestConfirmation();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 구매 요청을 확인 하겠어요?"
    );
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
