/* eslint-disable react/display-name */
import { renderHook, render } from "@testing-library/react";
import usePurchaseActionBtns from "../../../hooks/usePurchaseActionBtns";
import * as types from "../../../types/productManageTypes";

// Mock 컴포넌트
jest.mock(
  "../../../components/item/btns/trading/purchase/ChattingBtn",
  () => () => <div>ChattingBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/purchase/CancelBtn",
  () => () => <div>CancelBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/purchase/ReceiptConfirmationBtn",
  () => () => <div>ReceiptConfirmationBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/purchase/ReturnBtn",
  () => () => <div>ReturnBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/purchase/CancelWithdrawalBtn",
  () => () => <div>CancelWithdrawalBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/purchase/ReutrnWithdrawalBtn",
  () => () => <div>ReturnWithdrawalBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/purchase/ReturnDeliveryConfirmationBtn",
  () => () => <div>ReturnDeliveryConfirmationBtn</div>
);

describe("usePurchaseActionBtns 훅 테스트", () => {
  const getHook = (
    status: types.TradingStatus,
    process:
      | types.PurchaseCancelProcess
      | types.PurchaseReturnProcess
      | types.PurchaseTradingProcess
  ) =>
    renderHook(() =>
      usePurchaseActionBtns({
        tradingData: {
          status,
          process,
          productId: "product123",
          sellerId: "user123",
          _id: "",
          buyerId: "",
          sellerInfo: { nickname: "" },
          buyerInfo: { nickname: "" },
          productName: "",
          productPrice: 0,
          productImg: "",
          purchaseStartDate: "",
          isReviewed: false
        }
      })
    );

  it("TRADING / 판매자확인중일 때 ChattingBtn과 CancelBtn이 렌더링되는지", () => {
    const { result } = getHook(
      types.TradingStatus.TRADING,
      types.PurchaseTradingProcess.판매자확인중
    );

    const { getByText } = render(result.current!);
    expect(getByText("ChattingBtn")).toBeInTheDocument();
    expect(getByText("CancelBtn")).toBeInTheDocument();
  });

  it("TRADING / 상품인수확인일 때 ReceiptConfirmationBtn과 ReturnBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.TRADING,
      types.PurchaseTradingProcess.상품인수확인
    );

    const { getByText } = render(result.current!);
    expect(getByText("ReceiptConfirmationBtn")).toBeInTheDocument();
    expect(getByText("ReturnBtn")).toBeInTheDocument();
  });

  it("CANCEL / 판매자확인중일 때 CancelWithdrawalBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.CANCEL,
      types.PurchaseCancelProcess.판매자확인중
    );

    const { getByText } = render(result.current!);
    expect(getByText("CancelWithdrawalBtn")).toBeInTheDocument();
  });

  it("RETURN / 반품상품전달확인일 때 ReturnDeliveryConfirmationBtn과 ReturnWithdrawalBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.RETURN,
      types.PurchaseReturnProcess.반품상품전달확인
    );

    const { getByText } = render(result.current!);
    expect(getByText("ReturnDeliveryConfirmationBtn")).toBeInTheDocument();
    expect(getByText("ReturnWithdrawalBtn")).toBeInTheDocument();
  });

  it("정의되지 않은 status/process 조합일 경우 null 반환", () => {
    const { result } = getHook(
      "UNKNOWN" as types.TradingStatus,
      "UNKNOWN" as types.PurchaseCancelProcess
    );
    expect(result.current).toBeNull();
  });
});
