import getTradingDateFormat from "../../../utils/getTradingDateFormat";
import {
  SaleTradingData,
  PurchaseTradingData
} from "../../../types/productManageTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

function DateRow({ label, date }: { label: string; date?: string }) {
  if (!date) return null;

  return (
    <div>
      <span className="inline-block w-16">{label}</span>
      <time dateTime={date}>{getTradingDateFormat(date)}</time>
    </div>
  );
}

export default function ProductManageItemTradingEndContent({
  tradingData
}: IProps) {
  return (
    <>
      <DateRow
        label="판매일"
        date={(tradingData as SaleTradingData).saleStartDate}
      />
      <DateRow
        label="판매 완료"
        date={(tradingData as SaleTradingData).saleEndDate}
      />
      <DateRow
        label="구매일"
        date={(tradingData as PurchaseTradingData).purchaseStartDate}
      />
      <DateRow
        label="구매 완료"
        date={(tradingData as PurchaseTradingData).purchaseEndDate}
      />
    </>
  );
}
