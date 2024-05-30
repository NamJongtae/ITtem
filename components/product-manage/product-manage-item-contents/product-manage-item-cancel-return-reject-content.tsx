import { getTradingDateFormat } from '@/lib/getDateFormate';
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemCancelReturnRejectContent({
  tradingData,
}: IProps) {
  return (
    <>
      {tradingData.cancelRejectReason && (
        <div>
          <span className="inline-block w-16"> 거절 사유</span>
          <time dateTime={tradingData.returnEndDate}>
            {tradingData.cancelRejectReason}
          </time>
        </div>
      )}
      {tradingData.returnRejectReason && (
        <div>
          <span className="inline-block w-16"> 거절 사유</span>
          <time dateTime={tradingData.returnEndDate}>
            {tradingData.returnRejectReason}
          </time>
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
