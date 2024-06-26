import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function CancelAndReutrnDeatilModalReason({
  tradingData,
}: IProps) {
  return (
    <>
      {tradingData.cancelReason && (
        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">취소 사유</span>
          <p className="inline-block whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {tradingData.cancelReason}
          </p>
        </div>
      )}

      {tradingData.returnReason && (
        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">반품 사유</span>
          {tradingData.returnReason && (
            <p className="inline-block whitespace-pre-wrap max-h-[300px] overflow-y-auto">
              {tradingData.returnReason}
            </p>
          )}
        </div>
      )}

      {(tradingData.cancelRejectReason || tradingData.returnRejectReason) && (
        <div className="border-b border-gray-300 pb-2 flex items-center">
          <span className="font-medium w-20 inline-block shrink-0">
            거절 사유
          </span>
          <p className="inline-block whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {tradingData.cancelRejectReason
              ? tradingData.cancelRejectReason
              : tradingData.returnRejectReason}
          </p>
        </div>
      )}
    </>
  );
}
