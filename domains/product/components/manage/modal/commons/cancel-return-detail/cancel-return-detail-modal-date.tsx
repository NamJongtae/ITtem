import { getTradingDateFormat } from "@/utils/getDateFormate";
import {
  PurchaseTradingData,
  SaleTradingData
} from "@/domains/product/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

function DateRow({ label, date }: { label: string; date?: string }) {
  if (!date) return null;
  return (
    <div className="border-b border-gray-300 pb-2 flex items-center">
      <span className="font-medium w-20 inline-block shrink-0">{label}</span>
      <span>{getTradingDateFormat(date)}</span>
    </div>
  );
}

export default function CancelReturnDetailModalDate({ tradingData }: IProps) {
  const {
    cancelStartDate,
    cancelRejectDate,
    returnStartDate,
    returnRejectDate
  } = tradingData;

  return (
    <>
      <DateRow label="취소 요청" date={cancelStartDate} />
      <DateRow label="취소 거절" date={cancelRejectDate} />
      <DateRow label="반품 요청" date={returnStartDate} />
      <DateRow label="반품 거절" date={returnRejectDate} />
    </>
  );
}
