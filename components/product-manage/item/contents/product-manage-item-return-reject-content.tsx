import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemCancelReturnRejectContent({
  tradingData,
}: IProps) {
  return (
    <>
      {tradingData.cancelRejectReason && (
        <div className="flex mr-5">
          <span className="inline-block w-16"> 거절 사유</span>
          <p className="whitespace-pre-wrap">
            {tradingData.cancelRejectReason}
          </p>
        </div>
      )}
      {tradingData.returnRejectReason && (
        <div className="flex mr-5">
          <span className="inline-block w-16"> 거절 사유</span>
          <p className="whitespace-pre-wrap">
            {tradingData.returnRejectReason}
          </p>
        </div>
      )}
      {tradingData.cancelStartDate && (
        <div>
          <span className="inline-block w-16">취소 요청</span>
          <time dateTime={tradingData.cancelStartDate}>
            {getTradingDateFormat(tradingData.cancelStartDate)}
          </time>
        </div>
      )}
      {tradingData.returnStartDate && (
        <div>
          <span className="inline-block w-16">반품 요청</span>
          <time dateTime={tradingData.returnStartDate}>
            {getTradingDateFormat(tradingData.returnStartDate)}
          </time>
        </div>
      )}
      {tradingData.returnRejectDate && (
        <div>
          <span className="inline-block w-16">반품 거절</span>
          <time dateTime={tradingData.returnRejectDate}>
            {getTradingDateFormat(tradingData.returnRejectDate)}
          </time>
        </div>
      )}
      {tradingData.cancelRejectDate && (
        <div>
          <span className="inline-block w-16">취소 거절</span>
          <time dateTime={tradingData.cancelRejectDate}>
            {getTradingDateFormat(tradingData.cancelRejectDate)}
          </time>
        </div>
      )}
    </>
  );
}
