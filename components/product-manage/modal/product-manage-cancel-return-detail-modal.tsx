import Portal from "@/components/commons/portal/Portal";
import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import Image from "next/image";
import { isMobile } from "react-device-detect";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  closeModal: () => void;
}

export default function ProductManageCancelReturnDetailModal({
  tradingData,
  closeModal,
}: IProps) {
  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <div
        className={`${
          isMobile ? "h-screen" : "max-w-[480px]"
        } fixed center z-30 flex flex-col gap-2 w-full p-8 border bg-white`}
      >
        <h2
          className={`${
            isMobile ? "mt-10" : "mt-3"
          } text-xl text-center font-semibold mb-3`}
        >
          거래 상세 정보
        </h2>

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">상품명</span>
          <span>{tradingData.productData.name}</span>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">상품가격</span>
          <span>{tradingData.productData.price} 원</span>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">판매자</span>
          <span>{tradingData.sellerInfo.nickname}</span>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">구매자</span>
          <span>{tradingData.buyerInfo.nickname}</span>
        </div>

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

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block"> 거래 번호</span>
          <span>{tradingData._id}</span>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block"> 상품 번호</span>
          <span>{tradingData.productId}</span>
        </div>
        <p className="text-sm text-gray-400">
          * 거래 정보가 상이한 경우 고객센터로 문의 바랍니다.
        </p>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
        >
          <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
        </button>
      </div>
    </Portal>
  );
}
