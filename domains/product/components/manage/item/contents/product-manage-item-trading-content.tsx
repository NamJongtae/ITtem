import { getTradingDateFormat } from "@/utils/getDateFormate";
import {
  PurchaseTradingData,
  SaleTradingData
} from "@/domains/product/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

function ReasonRow({ label, content }: { label: string; content?: string }) {
  if (!content) return null;

  return (
    <div className="flex mr-5">
      <span className="inline-block w-16 font-medium shrink-0">{label}</span>
      <p className="whitespace-pre-wrap break-keep">{content}</p>
    </div>
  );
}

function DateRow({ label, content }: { label: string; content?: string }) {
  if (!content) return null;

  return (
    <div>
      <span className="inline-block w-16 font-medium">{label}</span>
      <time dateTime={content}>{getTradingDateFormat(content)}</time>
    </div>
  );
}

export default function ProductManageItemTradingContent({
  tradingData
}: IProps) {
  return (
    <>
      <div>
        <span className="inline-block w-16 font-medium">진행 상태</span>
        <span>{tradingData.process} </span>
      </div>
      <ReasonRow label="취소 사유" content={tradingData.cancelReason} />
      <ReasonRow label="반품 사유" content={tradingData.returnReason} />

      <DateRow
        label="등록일"
        content={(tradingData as SaleTradingData).saleStartDate}
      />
      <DateRow
        label="판매 완료"
        content={(tradingData as SaleTradingData).saleEndDate}
      />
      <DateRow
        label="구매일"
        content={(tradingData as PurchaseTradingData).purchaseStartDate}
      />
      <DateRow
        label="구매 완료"
        content={(tradingData as PurchaseTradingData).purchaseEndDate}
      />
    </>
  );
}
