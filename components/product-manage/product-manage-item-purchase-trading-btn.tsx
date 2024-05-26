import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingData,
  PurchaseTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import PurchaseTradingChattingBtn from "./purchaseTradingBtn/purchase-trading-chatting-btn";
import PurchaseTradingCancelBtn from "./purchaseTradingBtn/purchase-trading-cancel-btn";
import PurchaseTradingReceiptConfirmationBtn from "./purchaseTradingBtn/purchase-trading-receipt-confirmation-btn";
import PurchaseTradingReturnBtn from "./purchaseTradingBtn/purchase-trading-return-btn";
import PurchaseTradingReturnwithdrawalBtn from "./purchaseTradingBtn/purchase-trading-reutrn-withdrawal-btn";
import PurchaseTradingCancelWithdrawalBtn from "./purchaseTradingBtn/purchase-trading-cancel-withdrawal-btn";
import PurchaseTradingReturnDeliveryConfirmationBtn from "./purchaseTradingBtn/purchase-trading-return-delivery-confirmation-btn";

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function ProductManageItemPurchaseTradingBtn({
  tradingData,
}: IProps) {
  if (tradingData.status === TradingStatus.TRADING) {
    if (tradingData.process === PurchaseTradingProcess.판매자확인중) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingChattingBtn />
          <PurchaseTradingCancelBtn productId={tradingData.productId} />
        </div>
      );
    } else if (
      tradingData.process === PurchaseTradingProcess.판매자상품전달중
    ) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingChattingBtn />
          <PurchaseTradingCancelBtn productId={tradingData.productId} />
        </div>
      );
    } else if (tradingData.process === PurchaseTradingProcess.상품인수확인) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingReceiptConfirmationBtn
            productId={tradingData.productId}
          />
          <PurchaseTradingReturnBtn productId={tradingData.productId} />
        </div>
      );
    }
  } else if (tradingData.status === TradingStatus.CANCEL) {
    if (tradingData.process === PurchaseCancelProcess.판매자확인중) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingCancelWithdrawalBtn
            productId={tradingData.productId}
          />
        </div>
      );
    }
  } else if (tradingData.status === TradingStatus.RETURN) {
    if (tradingData.process === PurchaseReturnProcess.판매자확인중) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingReturnwithdrawalBtn
            productId={tradingData.productId}
          />
        </div>
      );
    } else if (tradingData.process === PurchaseReturnProcess.반품상품전달확인) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingReturnDeliveryConfirmationBtn
            productId={tradingData.productId}
          />
          <PurchaseTradingReturnwithdrawalBtn
            productId={tradingData.productId}
          />
        </div>
      );
    } else if (
      tradingData.process === PurchaseReturnProcess.판매자반품상품인수확인중
    ) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingChattingBtn />
        </div>
      );
    }
  }
  return null;
}
