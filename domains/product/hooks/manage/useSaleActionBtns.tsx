import SaleTradingCancelConfirmationBtn from "../../components/manage/item/btns/trading/sale/sale-trading-cancel-confirmation-btn";
import SaleTradingChattingBtn from "../../components/manage/item/btns/trading/sale/sale-trading-chatting-btn";
import SaleTradingDeleteBtn from "../../components/manage/item/btns/trading/sale/sale-trading-delete-btn";
import SaleTradingDeliveryConfirmationBtn from "../../components/manage/item/btns/trading/sale/sale-trading-delivery-confirmation-btn";
import SaleTradingEditBtn from "../../components/manage/item/btns/trading/sale/sale-trading-edit-btn";
import SaleTradingPurchaseCancelRejectBtn from "../../components/manage/item/btns/trading/sale/sale-trading-purchase-cancel-reject-btn";
import SaleTradingPurchaseConfirmationBtn from "../../components/manage/item/btns/trading/sale/sale-trading-purchase-confirmation-btn";
import SaleTradingPurchaseRequestRejectBtn from "../../components/manage/item/btns/trading/sale/sale-trading-purchase-request-reject-btn";
import SaleTradingReturnRejectBtn from "../../components/manage/item/btns/trading/sale/sale-tradingreturn-reject-btn";
import SaleTradingReturnConfirmationBtn from "../../components/manage/item/btns/trading/sale/sale-trading-return-confirmation-btn";
import SaleTradingReturnReceiptConfirmationBtn from "../../components/manage/item/btns/trading/sale/sale-trading-return-receipt-confirmation-btn";
import {
  SaleTradingData,
  SaleTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  TradingStatus
} from "../../types/product-types";
import { JSX } from "react";

type ButtonComponent = ({
  productId,
  userId
}: {
  productId: string;
  userId?: string;
}) => JSX.Element;

interface ButtonComponents {
  [key: string]: {
    [key: string]: ButtonComponent;
  };
}

const buttonComponents: ButtonComponents = {
  [TradingStatus.TRADING]: {
    [SaleTradingProcess.판매중]: ({ productId }) => (
      <>
        <SaleTradingEditBtn productId={productId} />
        <SaleTradingDeleteBtn productId={productId} />
      </>
    ),
    [SaleTradingProcess.구매요청확인]: ({ productId }) => (
      <>
        <SaleTradingPurchaseConfirmationBtn productId={productId} />
        <SaleTradingPurchaseRequestRejectBtn productId={productId} />
      </>
    ),
    [SaleTradingProcess.상품전달확인]: ({ productId }) => (
      <SaleTradingDeliveryConfirmationBtn productId={productId} />
    ),
    [SaleTradingProcess.구매자상품인수중]: ({ productId, userId }) => (
      <SaleTradingChattingBtn productId={productId} userId={userId!} />
    )
  },
  [TradingStatus.CANCEL]: {
    [SalesCancelProcess.취소요청확인]: ({ productId }) => (
      <>
        <SaleTradingCancelConfirmationBtn productId={productId} />
        <SaleTradingPurchaseCancelRejectBtn productId={productId} />
      </>
    )
  },
  [TradingStatus.RETURN]: {
    [SalesReturnProcess.반품요청확인]: ({ productId }) => (
      <>
        <SaleTradingReturnConfirmationBtn productId={productId} />
        <SaleTradingReturnRejectBtn productId={productId} />
      </>
    ),
    [SalesReturnProcess.구매자반품상품전달중]: ({ productId, userId }) => (
      <SaleTradingChattingBtn productId={productId} userId={userId!} />
    ),
    [SalesReturnProcess.반품상품인수확인]: ({ productId }) => (
      <>
        <SaleTradingReturnReceiptConfirmationBtn productId={productId} />
        <SaleTradingReturnRejectBtn productId={productId} />
      </>
    )
  }
};

interface IParams {
  tradingData: SaleTradingData;
}

export default function useSaleActionBtns({ tradingData }: IParams) {
  const { status, process, productId, sellerId } = tradingData;

  const Button = buttonComponents[status]?.[process];

  return Button ? Button({ productId, userId: sellerId }) : null;
}
