import {
  SaleTradingData,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import SaleTradingDeleteBtn from "./sale-trading-delete-btn";
import SaleTradingEditBtn from "./sale-trading-edit-btn";
import SaleTradingPurchaseConfirmationBtn from "./sale-trading-purchase-confirmation-btn";
import SaleTradingDeliveryConfirmationBtn from "./sale-trading-delivery-confirmation-btn";
import SaleTradingCancelConfirmationBtn from "./sale-trading-cancel-confirmation-btn";
import SaleTradingPurchaseCancelRejectBtn from "./sale-trading-purchase-cancel-reject-btn";
import SaleTradingReturnConfirmationBtn from "./sale-trading-return-confirmation-btn";
import SaleTradingRetrunRejectBtn from "./sale-trading-retrun-reject-btn";
import SaleTradingChattingBtn from "./sale-trading-chatting-btn";
import SaleTradingReturnReceiptConfirmationBtn from "./sale-trading-return-receipt-confirmation-btn";
import SaleTradingPurchaseRequestRejectBtn from "./sale-trading-purchase-request-reject-btn";

interface IProps {
  tradingData: SaleTradingData;
}

type ButtonComponent = (productId: string) => JSX.Element;

interface ButtonComponents {
  [key: string]: {
    [key: string]: ButtonComponent;
  };
}

const buttonComponents: ButtonComponents = {
  [TradingStatus.TRADING]: {
    [SaleTradingProcess.판매중]: (productId: string) => (
      <>
        <SaleTradingEditBtn productId={productId} />
        <SaleTradingDeleteBtn productId={productId} />
      </>
    ),
    [SaleTradingProcess.구매요청확인]: (productId: string) => (
      <>
        <SaleTradingPurchaseConfirmationBtn productId={productId} />
        <SaleTradingPurchaseRequestRejectBtn productId={productId} />
      </>
    ),
    [SaleTradingProcess.상품전달확인]: (productId: string) => (
      <SaleTradingDeliveryConfirmationBtn productId={productId} />
    ),
    [SaleTradingProcess.구매자상품인수중]: () => <SaleTradingChattingBtn />,
  },
  [TradingStatus.CANCEL]: {
    [SalesCancelProcess.취소요청확인]: (productId: string) => (
      <>
        <SaleTradingCancelConfirmationBtn productId={productId} />
        <SaleTradingPurchaseCancelRejectBtn productId={productId} />
      </>
    ),
  },
  [TradingStatus.RETURN]: {
    [SalesReturnProcess.반품요청확인]: (productId: string) => (
      <>
        <SaleTradingReturnConfirmationBtn productId={productId} />
        <SaleTradingRetrunRejectBtn productId={productId} />
      </>
    ),
    [SalesReturnProcess.구매자반품상품전달중]: () => <SaleTradingChattingBtn />,
    [SalesReturnProcess.반품상품인수확인]: (productId: string) => (
      <>
        <SaleTradingReturnReceiptConfirmationBtn productId={productId} />
        <SaleTradingRetrunRejectBtn productId={productId} />
      </>
    ),
  },
};

export default function SaleTradingBtns({
  tradingData,
}: IProps) {
  const { status, process, productId } = tradingData;

  const Button = buttonComponents[status]?.[process];

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">
      {Button(productId)}
    </div>
  ) : null;
}
