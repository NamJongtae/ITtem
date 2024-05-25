import {
  SaleTradingData,
  SalesCancelProcess,
  SalesReturnProcess,
  SalesTradingProcess,
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
import SaleTradingReturnReceiptComfirmationBtn from "./saleTradingBtn/sale-trading-return-receipt-comfirmation-btn";
import SaleTradingPurchaseRequestRejectBtn from "./saleTradingBtn/sale-trading-purchase-request-reject-btn";

interface IProps {
  tradingData: SaleTradingData;
}

export default function ProductManageItemSaleTradingBtn({
  tradingData,
}: IProps) {
  if (tradingData.process === SalesTradingProcess.판매중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingEditBtn productId={tradingData.productId} />
        <SaleTradingDeleteBtn productId={tradingData.productId} />
      </div>
    );
  } else if (tradingData.process === SalesTradingProcess.구매요청확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingPurchaseConfirmationBtn productId={tradingData.productId} />
        <SaleTradingPurchaseRequestRejectBtn
          productId={tradingData.productId}
        />
      </div>
    );
  } else if (tradingData.process === SalesTradingProcess.상품전달확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingDeliveryConfirmationBtn productId={tradingData.productId} />
      </div>
    );
  } else if (tradingData.process === SalesTradingProcess.구매자상품인수중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingChattingBtn />
      </div>
    );
  } else if (tradingData.process === SalesCancelProcess.취소요청확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingCancelConfirmationBtn productId={tradingData.productId} />
        <SaleTradingPurchaseCancelRejectBtn productId={tradingData.productId} />
      </div>
    );
  } else if (tradingData.process === SalesReturnProcess.반품요청확인) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingReturnConfirmationBtn productId={tradingData.productId} />
      </div>
    );
  } else if (tradingData.process === SalesReturnProcess.구매자반품상품전달중) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingChattingBtn />
      </div>
    );
  } else if (
    tradingData.process === SalesReturnProcess.판매자반품상품인수확인
  ) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradingReturnReceiptComfirmationBtn
          productId={tradingData.productId}
        />
        <SaleTradingRetrunRejectBtn productId={tradingData.productId} />
      </div>
    );
  }
  return null;
}
