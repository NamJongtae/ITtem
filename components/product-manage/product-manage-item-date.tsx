import { getTradingDateFormat } from '@/lib/getDateFormate';
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { useRouter } from "next/router";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemDate({ tradingData }: IProps) {
  const router = useRouter();
  const status = router.query?.status;

  return (
    <>
      {status === "CANCEL_END/RETURN_END" ? (
        <>
          {tradingData.cancelStartDate && (
            <div>
              <span className="inline-block w-16">취소요청</span>
              <time dateTime={tradingData.cancelStartDate}>
                {getTradingDateFormat(tradingData.cancelStartDate)}
              </time>
            </div>
          )}
          {tradingData.cancelEndDate && (
            <div>
              <span className="inline-block w-16">취소완료</span>
              <time dateTime={tradingData.cancelEndDate}>
                {getTradingDateFormat(tradingData.cancelEndDate)}
              </time>
            </div>
          )}
          {tradingData.returnStartDate && (
            <div>
              <span className="inline-block w-16">반품요청</span>
              <time dateTime={tradingData.returnStartDate}>
                {getTradingDateFormat(tradingData.returnStartDate)}
              </time>
            </div>
          )}
          {tradingData.returnEndDate && (
            <div>
              <span className="inline-block w-16">반품완료</span>
              <time dateTime={tradingData.returnEndDate}>
                {getTradingDateFormat(tradingData.returnEndDate)}
              </time>
            </div>
          )}
        </>
      ) : (
        <>
          {"saleStartDate" in tradingData && (
            <div>
              <span className="inline-block w-16">등록일</span>
              <time dateTime={tradingData.saleStartDate}>
                {getTradingDateFormat(tradingData.saleStartDate)}
              </time>
            </div>
          )}
          {"saleEndDate" in tradingData && (
            <div>
              <span className="inline-block w-16">판매완료</span>
              <time dateTime={tradingData.saleEndDate}>
                {getTradingDateFormat(tradingData.saleEndDate || "")}
              </time>
            </div>
          )}

          {"purchaseStartDate" in tradingData && (
            <div>
              <span className="inline-block w-16">구매일</span>
              <time dateTime={tradingData.purchaseStartDate}>
                {getTradingDateFormat(tradingData.purchaseStartDate)}
              </time>
            </div>
          )}
          {"purchaseEndDate" in tradingData && (
            <div>
              <span className="inline-block w-16">구매완료</span>
              <time dateTime={tradingData.purchaseEndDate}>
                {getTradingDateFormat(tradingData.purchaseEndDate || "")}
              </time>
            </div>
          )}
        </>
      )}
    </>
  );
}
