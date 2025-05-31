import getTradingDateFormat from "../../../utils/getTradingDateFormat";
import {
  SaleTradingData,
  PurchaseTradingData
} from "../../../types/productManageTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

function ReasonRow({ label, content }: { label: string; content?: string }) {
  if (!content) return null;

  return (
    <div className="flex items-center">
      <span className="inline-block w-16">{label}</span>
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
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

export default function ProductManageItemCancelReturnContent({
  tradingData
}: IProps) {
  return (
    <>
      <ReasonRow label="취소 사유" content={tradingData.cancelReason} />
      <ReasonRow label="반품 사유" content={tradingData.returnReason} />

      <DateRow label="취소 요청" date={tradingData.cancelStartDate} />
      <DateRow label="취소 완료" date={tradingData.cancelEndDate} />
      <DateRow label="반품 요청" date={tradingData.returnStartDate} />
      <DateRow label="반품 완료" date={tradingData.returnEndDate} />
    </>
  );
}
