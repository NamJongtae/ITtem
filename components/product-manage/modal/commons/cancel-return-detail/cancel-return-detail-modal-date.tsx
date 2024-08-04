import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function CancleReturnDetailModalDate({ tradingData }: IProps) {
  return (
    <>
      {tradingData.cancelStartDate && (
        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">취소 요청</span>
          <span>{getTradingDateFormat(tradingData.cancelStartDate)}</span>
        </div>
      )}
      {tradingData.cancelRejectDate && (
        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">취소 거절</span>
          <span>{getTradingDateFormat(tradingData.cancelRejectDate)}</span>
        </div>
      )}

      {tradingData.returnStartDate && (
        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">반품 요청</span>
          <span>{getTradingDateFormat(tradingData.returnStartDate)}</span>
        </div>
      )}
      {tradingData.returnRejectDate && (
        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">반품 거절</span>
          <span>{getTradingDateFormat(tradingData.returnRejectDate)}</span>
        </div>
      )}
    </>
  );
}
