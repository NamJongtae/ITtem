import {
  SaleTradingData,
  SalesCancelProcess,
  SalesReturnProcess,
  SalesTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import SaleTradingDeleteBtn from "./saleTradingBtn/sale-trading-delete-btn";
import SaleTradingEditBtn from "./saleTradingBtn/sale-trading-edit-btn";
import SaleTradingPurchaseConfirmationBtn from "./saleTradingBtn/sale-trading-purchase-confirmation-btn";
import SaleTradingDeliveryConfirmationBtn from "./saleTradingBtn/sale-trading-delivery-confirmation-btn";
import SaleTradingCancelConfirmationBtn from "./saleTradingBtn/sale-trading-cancel-confirmation-btn";
import SaleTradingPurchaseCancelRejectBtn from "./saleTradingBtn/sale-trading-purchase-cancel-reject-btn";
import SaleTradingReturnConfirmationBtn from "./saleTradingBtn/sale-trading-return-confirmation-btn";
import SaleTradingRetrunRejectBtn from "./saleTradingBtn/sale-trading-retrun-reject-btn";
import SaleTradingChattingBtn from "./saleTradingBtn/sale-trading-chatting-btn";
import SaleTradingReturnReceiptConfirmationBtn from "./saleTradingBtn/sale-trading-return-receipt-confirmation-btn";
import SaleTradingPurchaseRequestRejectBtn from "./saleTradingBtn/sale-trading-purchase-request-reject-btn";

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
    [SalesTradingProcess.판매중]: (productId: string) => (
      <>
        <SaleTradingEditBtn productId={productId} />
        <SaleTradingDeleteBtn productId={productId} />
      </>
    ),
    [SalesTradingProcess.구매요청확인]: (productId: string) => (
      <>
        <SaleTradingPurchaseConfirmationBtn productId={productId} />
        <SaleTradingPurchaseRequestRejectBtn productId={productId} />
      </>
    ),
    [SalesTradingProcess.상품전달확인]: (productId: string) => (
      <SaleTradingDeliveryConfirmationBtn productId={productId} />
    ),
    [SalesTradingProcess.구매자상품인수중]: () => <SaleTradingChattingBtn />,
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
      <SaleTradingReturnConfirmationBtn productId={productId} />
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

export default function ProductManageItemSaleTradingBtn({
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
