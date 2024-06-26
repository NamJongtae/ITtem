import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemTradingContent({
  tradingData,
}: IProps) {
  return (
    <>
      <div>
        <span className="inline-block w-16 font-medium">진행 상태</span>
        <span>{tradingData.process} </span>
      </div>
      {tradingData.cancelReason && (
        <div className="flex mr-5">
          <span className="inline-block w-16 font-medium">취소 사유</span>
          <p className="whitespace-pre-wrap break-keep">
            {tradingData.cancelReason}
          </p>
        </div>
      )}
      {tradingData.returnReason && (
        <div className="flex mr-5">
          <span className="inline-block w-16 font-medium shrink-0">
            반품 사유
          </span>
          <p className="whitespace-pre-wrap break-keep">
            {tradingData.returnReason}
          </p>
        </div>
      )}

      {"saleStartDate" in tradingData && (
        <div>
          <span className="inline-block w-16 font-medium">등록일</span>
          <time dateTime={tradingData.saleStartDate}>
            {getTradingDateFormat(tradingData.saleStartDate)}
          </time>
        </div>
      )}
      {"saleEndDate" in tradingData && (
        <div>
          <span className="inline-block w-16 font-medium">판매 완료</span>
          <time dateTime={tradingData.saleEndDate}>
            {getTradingDateFormat(tradingData.saleEndDate!)}
          </time>
        </div>
      )}
      {"purchaseStartDate" in tradingData && (
        <div>
          <span className="inline-block w-16 font-medium">구매일</span>
          <time dateTime={tradingData.purchaseStartDate}>
            {getTradingDateFormat(tradingData.purchaseStartDate)}
          </time>
        </div>
      )}
      {"purchaseEndDate" in tradingData && (
        <div>
          <span className="inline-block w-16 font-medium">구매 완료</span>
          <time dateTime={tradingData.purchaseEndDate}>
            {getTradingDateFormat(tradingData.purchaseEndDate!)}
          </time>
        </div>
      )}
    </>
  );
}
