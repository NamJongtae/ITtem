import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingData,
  PurchaseTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import PurchaseTradingChattingBtn from "./purchase-trading-chatting-btn";
import PurchaseTradingCancelBtn from "./purchase-trading-cancel-btn";
import PurchaseTradingReceiptConfirmationBtn from "./purchase-trading-receipt-confirmation-btn";
import PurchaseTradingReturnBtn from "./purchase-trading-return-btn";
import PurchaseTradingReturnwithdrawalBtn from "./purchase-trading-reutrn-withdrawal-btn";
import PurchaseTradingCancelWithdrawalBtn from "./purchase-trading-cancel-withdrawal-btn";
import PurchaseTradingReturnDeliveryConfirmationBtn from "./purchase-trading-return-delivery-confirmation-btn";

interface IProps {
  tradingData: PurchaseTradingData;
}

type ButtonComponent = (productId: string) => JSX.Element;

interface ButtonComponents {
  [key: string]: {
    [key: string]: ButtonComponent;
  };
}

const buttonComponents: ButtonComponents = {
  [TradingStatus.TRADING]: {
    [PurchaseTradingProcess.판매자확인중]: (productId: string) => (
      <>
        <PurchaseTradingChattingBtn />
        <PurchaseTradingCancelBtn productId={productId} />
      </>
    ),
    [PurchaseTradingProcess.판매자상품전달중]: (productId: string) => (
      <>
        <PurchaseTradingChattingBtn />
        <PurchaseTradingCancelBtn productId={productId} />
      </>
    ),
    [PurchaseTradingProcess.상품인수확인]: (productId: string) => (
      <>
        <PurchaseTradingReceiptConfirmationBtn productId={productId} />
        <PurchaseTradingReturnBtn productId={productId} />
      </>
    ),
  },
  [TradingStatus.CANCEL]: {
    [PurchaseCancelProcess.판매자확인중]: (productId: string) => (
      <PurchaseTradingCancelWithdrawalBtn productId={productId} />
    ),
  },
  [TradingStatus.RETURN]: {
    [PurchaseReturnProcess.판매자확인중]: (productId: string) => (
      <PurchaseTradingReturnwithdrawalBtn productId={productId} />
    ),
    [PurchaseReturnProcess.반품상품전달확인]: (productId: string) => (
      <>
        <PurchaseTradingReturnDeliveryConfirmationBtn productId={productId} />
        <PurchaseTradingReturnwithdrawalBtn productId={productId} />
      </>
    ),
    [PurchaseReturnProcess.판매자반품상품인수확인중]: () => (
      <PurchaseTradingChattingBtn />
    ),
  },
};

export default function PurchaseTradingBtns({ tradingData }: IProps) {
  const { status, process, productId } = tradingData;

  const Button = buttonComponents[status]?.[process];

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">
      {Button(productId)}
    </div>
  ) : null;
}
