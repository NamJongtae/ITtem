import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemCancelReturnContent({
  tradingData,
}: IProps) {
  return (
    <>
      {tradingData.cancelReason && (
        <div className="flex items-center">
          <span className="inline-block w-16">취소 사유</span>
          <p className="whitespace-pre-wrap">{tradingData.cancelReason}</p>
        </div>
      )}
      {tradingData.returnReason && (
        <div className="flex items-center">
          <span className="inline-block w-16">반품 사유</span>
          <p className="whitespace-pre-wrap">{tradingData.returnReason}</p>
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
      {tradingData.cancelEndDate && (
        <div>
          <span className="inline-block w-16">취소 완료</span>
          <time dateTime={tradingData.cancelEndDate}>
            {getTradingDateFormat(tradingData.cancelEndDate)}
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
      {tradingData.returnEndDate && (
        <div>
          <span className="inline-block w-16">반품 완료</span>
          <time dateTime={tradingData.returnEndDate}>
            {getTradingDateFormat(tradingData.returnEndDate)}
          </time>
        </div>
      )}
    </>
  );
}
