import { getTradingDateFormat } from "@/shared/common/utils/getDateFormate";
import {
  SaleTradingData,
  PurchaseTradingData
} from "../../../types/productManageTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

function ContentRow({
  label,
  content,
  isDate = false
}: {
  label: string;
  content?: string;
  isDate?: boolean;
}) {
  if (!content) return null;

  return (
    <div className={`flex items-start mb-1 ${!isDate ? "mr-5" : ""}`}>
      <span className="inline-block w-16 shrink-0 font-medium">{label}</span>
      {isDate ? (
        <time dateTime={content}>{getTradingDateFormat(content)}</time>
      ) : (
        <p className="whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}

export default function ProductManageItemCancelReturnRejectContent({
  tradingData
}: IProps) {
  return (
    <>
      <ContentRow label="거절 사유" content={tradingData.cancelRejectReason} />
      <ContentRow label="거절 사유" content={tradingData.returnRejectReason} />
      <ContentRow
        label="취소 요청"
        content={tradingData.cancelStartDate}
        isDate
      />
      <ContentRow
        label="반품 요청"
        content={tradingData.returnStartDate}
        isDate
      />
      <ContentRow
        label="반품 거절"
        content={tradingData.returnRejectDate}
        isDate
      />
      <ContentRow
        label="취소 거절"
        content={tradingData.cancelRejectDate}
        isDate
      />
    </>
  );
}
