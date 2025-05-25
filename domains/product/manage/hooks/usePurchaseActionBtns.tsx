import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingData,
  PurchaseTradingProcess,
  TradingStatus
} from "../types/productManageTypes";
import { JSX } from "react";
import PurchaseTradingChattingBtn from "../components/item/btns/trading/purchase/ChattingBtn";
import PurchaseTradingCancelBtn from "../components/item/btns/trading/purchase/CancelBtn";
import PurchaseTradingReceiptConfirmationBtn from "../components/item/btns/trading/purchase/ReceiptConfirmationBtn";
import PurchaseTradingReturnBtn from "../components/item/btns/trading/purchase/ReturnBtn";
import PurchaseTradingCancelWithdrawalBtn from "../components/item/btns/trading/purchase/CancelWithdrawalBtn";
import PurchaseTradingReturnWithdrawalBtn from "../components/item/btns/trading/purchase/ReutrnWithdrawalBtn";
import PurchaseTradingReturnDeliveryConfirmationBtn from "../components/item/btns/trading/purchase/ReturnDeliveryConfirmationBtn";

type ButtonComponent = (props: {
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
    [PurchaseTradingProcess.판매자확인중]: ({ productId, userId }) => (
      <>
        <PurchaseTradingChattingBtn productId={productId} userId={userId!} />
        <PurchaseTradingCancelBtn productId={productId} />
      </>
    ),
    [PurchaseTradingProcess.판매자상품전달중]: ({ productId, userId }) => (
      <>
        <PurchaseTradingChattingBtn productId={productId} userId={userId!} />
        <PurchaseTradingCancelBtn productId={productId} />
      </>
    ),
    [PurchaseTradingProcess.판매자반품거절상품전달중]: ({
      productId,
      userId
    }) => (
      <>
        <PurchaseTradingChattingBtn productId={productId} userId={userId!} />
      </>
    ),
    [PurchaseTradingProcess.상품인수확인]: ({ productId }) => (
      <>
        <PurchaseTradingReceiptConfirmationBtn productId={productId} />
        <PurchaseTradingReturnBtn productId={productId} />
      </>
    )
  },
  [TradingStatus.CANCEL]: {
    [PurchaseCancelProcess.판매자확인중]: ({ productId }) => (
      <PurchaseTradingCancelWithdrawalBtn productId={productId} />
    )
  },
  [TradingStatus.RETURN]: {
    [PurchaseReturnProcess.판매자확인중]: ({ productId }) => (
      <PurchaseTradingReturnWithdrawalBtn productId={productId} />
    ),
    [PurchaseReturnProcess.반품상품전달확인]: ({ productId }) => (
      <>
        <PurchaseTradingReturnDeliveryConfirmationBtn productId={productId} />
        <PurchaseTradingReturnWithdrawalBtn productId={productId} />
      </>
    ),
    [PurchaseReturnProcess.판매자반품상품인수확인중]: ({
      productId,
      userId
    }) => <PurchaseTradingChattingBtn productId={productId} userId={userId!} />
  }
};

interface IParams {
  tradingData: PurchaseTradingData;
}

export default function usePurchaseActionBtns({ tradingData }: IParams) {
  const { status, process, productId, sellerId } = tradingData;

  const Button = buttonComponents[status]?.[process];

  return Button ? Button({ productId, userId: sellerId }) : null;
}
