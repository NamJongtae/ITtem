import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/manage/types/productManageTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

function ReasonRow({ label, content }: { label: string; content?: string }) {
  if (!content) return null;
  return (
    <div className="border-b border-gray-300 pb-2 flex items-center">
      <span className="font-medium w-20 inline-block shrink-0">{label}</span>
      <p className="inline-block whitespace-pre-wrap max-h-[300px] overflow-y-auto">
        {content}
      </p>
    </div>
  );
}

export default function ReasonData({ tradingData }: IProps) {
  const { cancelReason, returnReason, cancelRejectReason, returnRejectReason } =
    tradingData;

  return (
    <>
      <ReasonRow label="취소 사유" content={cancelReason} />
      <ReasonRow label="반품 사유" content={returnReason} />
      <ReasonRow
        label="거절 사유"
        content={cancelRejectReason || returnRejectReason}
      />
    </>
  );
}
