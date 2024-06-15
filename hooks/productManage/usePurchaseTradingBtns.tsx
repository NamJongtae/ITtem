import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingData,
  PurchaseTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import { JSX } from "react";
import PurchaseTradingChattingBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-chatting-btn";
import PurchaseTradingCancelBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-cancel-btn";
import PurchaseTradingReceiptConfirmationBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-receipt-confirmation-btn";
import PurchaseTradingReturnBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-return-btn";
import PurchaseTradingCancelWithdrawalBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-cancel-withdrawal-btn";
import PurchaseTradingReturnwithdrawalBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-reutrn-withdrawal-btn";
import PurchaseTradingReturnDeliveryConfirmationBtn from "@/components/product-manage/product-manage-item-btns/purchase-trading-btns/purchase-trading-return-delivery-confirmation-btn";

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
    [PurchaseTradingProcess.상품인수확인]: ({ productId }) => (
      <>
        <PurchaseTradingReceiptConfirmationBtn productId={productId} />
        <PurchaseTradingReturnBtn productId={productId} />
      </>
    ),
  },
  [TradingStatus.CANCEL]: {
    [PurchaseCancelProcess.판매자확인중]: ({ productId }) => (
      <PurchaseTradingCancelWithdrawalBtn productId={productId} />
    ),
  },
  [TradingStatus.RETURN]: {
    [PurchaseReturnProcess.판매자확인중]: ({ productId }) => (
      <PurchaseTradingReturnwithdrawalBtn productId={productId} />
    ),
    [PurchaseReturnProcess.반품상품전달확인]: ({ productId }) => (
      <>
        <PurchaseTradingReturnDeliveryConfirmationBtn productId={productId} />
        <PurchaseTradingReturnwithdrawalBtn productId={productId} />
      </>
    ),
    [PurchaseReturnProcess.판매자반품상품인수확인중]: ({
      productId,
      userId,
    }) => <PurchaseTradingChattingBtn productId={productId} userId={userId!} />,
  },
};

interface IPrarms {
  tradingData: PurchaseTradingData;
}

export default function usePurchaseTradingBtns({ tradingData }: IPrarms) {
  const { status, process, productId, sellerId } = tradingData;

  const Button = buttonComponents[status]?.[process];

  return Button ? Button({ productId, userId: sellerId }) : null;
}
