/* eslint-disable react/display-name */
import { renderHook, render } from "@testing-library/react";
import useSaleActionBtns from "../../../hooks/useSaleActionBtns";
import * as types from "../../../types/productManageTypes";

// Mock 컴포넌트
jest.mock(
  "../../../components/item/btns/trading/sale/CancelConfirmationBtn",
  () => () => <div>CancelConfirmationBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/sale/ChattingBtn",
  () => () => <div>ChattingBtn</div>
);
jest.mock("../../../components/item/btns/trading/sale/DeleteBtn", () => () => (
  <div>DeleteBtn</div>
));
jest.mock(
  "../../../components/item/btns/trading/sale/DeliveryConfirmationBtn",
  () => <div>DeliveryConfirmationBtn</div>
);
jest.mock("../../../components/item/btns/trading/sale/EditBtn", () => () => (
  <div>EditBtn</div>
));
jest.mock(
  "../../../components/item/btns/trading/sale/PurchaseCancelRejectBtn",
  () => () => <div>PurchaseCancelRejectBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/sale/PurchaseConfirmationBtn",
  () => () => <div>PurchaseConfirmationBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/sale/PurchaseRequestRejectBtn",
  () => () => <div>PurchaseRequestRejectBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/sale/ReturnRejectBtn",
  () => () => <div>ReturnRejectBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/sale/ReturnConfirmationBtn",
  () => () => <div>ReturnConfirmationBtn</div>
);
jest.mock(
  "../../../components/item/btns/trading/sale/ReturnReceiptConfirmationBtn",
  () => () => <div>ReturnReceiptConfirmationBtn</div>
);

describe("useSaleActionBtns 훅 테스트", () => {
  const getHook = (
    status: types.TradingStatus,
    process:
      | types.SaleTradingProcess
      | types.SalesCancelProcess
      | types.SalesReturnProcess
  ) =>
    renderHook(() =>
      useSaleActionBtns({
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
          saleStartDate: "",
          isReviewed: false
        }
      })
    );

  it("TRADING / 판매중일 때 EditBtn, DeleteBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.TRADING,
      types.SaleTradingProcess.판매중
    );
    const { getByText } = render(result.current!);
    expect(getByText("EditBtn")).toBeInTheDocument();
    expect(getByText("DeleteBtn")).toBeInTheDocument();
  });

  it("TRADING / 구매요청확인일 때 PurchaseConfirmationBtn, PurchaseRequestRejectBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.TRADING,
      types.SaleTradingProcess.구매요청확인
    );
    const { getByText } = render(result.current!);
    expect(getByText("PurchaseConfirmationBtn")).toBeInTheDocument();
    expect(getByText("PurchaseRequestRejectBtn")).toBeInTheDocument();
  });

  it("CANCEL / 취소요청확인일 때 CancelConfirmationBtn, PurchaseCancelRejectBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.CANCEL,
      types.SalesCancelProcess.취소요청확인
    );
    const { getByText } = render(result.current!);
    expect(getByText("CancelConfirmationBtn")).toBeInTheDocument();
    expect(getByText("PurchaseCancelRejectBtn")).toBeInTheDocument();
  });

  it("RETURN / 반품상품인수확인일 때 ReturnReceiptConfirmationBtn, ReturnRejectBtn 렌더링", () => {
    const { result } = getHook(
      types.TradingStatus.RETURN,
      types.SalesReturnProcess.반품상품인수확인
    );
    const { getByText } = render(result.current!);
    expect(getByText("ReturnReceiptConfirmationBtn")).toBeInTheDocument();
    expect(getByText("ReturnRejectBtn")).toBeInTheDocument();
  });

  it("알 수 없는 status/process일 경우 null 반환", () => {
    const { result } = getHook(
      "UNKNOWN" as types.TradingStatus,
      "UNKNOWN" as types.SaleTradingProcess
    );
    expect(result.current).toBeNull();
  });
});
