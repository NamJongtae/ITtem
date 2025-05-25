import SaleTradingCancelConfirmationBtn from "../components/item/btns/trading/sale/CancelConfirmationBtn";
import SaleTradingChattingBtn from "../components/item/btns/trading/sale/ChattingBtn";
import SaleTradingDeleteBtn from "../components/item/btns/trading/sale/DeleteBtn";
import SaleTradingDeliveryConfirmationBtn from "../components/item/btns/trading/sale/DeliveryConfirmationBtn";
import SaleTradingEditBtn from "../components/item/btns/trading/sale/EditBtn";
import SaleTradingPurchaseCancelRejectBtn from "../components/item/btns/trading/sale/PurchaseCancelRejectBtn";
import SaleTradingPurchaseConfirmationBtn from "../components/item/btns/trading/sale/PurchaseConfirmationBtn";
import SaleTradingPurchaseRequestRejectBtn from "../components/item/btns/trading/sale/PurchaseRequestRejectBtn";
import SaleTradingReturnRejectBtn from "../components/item/btns/trading/sale/ReturnRejectBtn";
import SaleTradingReturnConfirmationBtn from "../components/item/btns/trading/sale/ReturnConfirmationBtn";
import SaleTradingReturnReceiptConfirmationBtn from "../components/item/btns/trading/sale/ReturnReceiptConfirmationBtn";
import {
  SaleTradingData,
  SaleTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  TradingStatus
} from "../types/productManageTypes";
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
