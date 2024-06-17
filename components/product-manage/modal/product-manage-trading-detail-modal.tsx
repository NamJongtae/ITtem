import Portal from "@/components/commons/portal/Portal";
import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import Image from "next/image";
import { isMobile } from "react-device-detect";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  handleClickCloseBtn: () => void;
}

export default function ProductManageTradingDetailModal({
  tradingData,
  handleClickCloseBtn,
}: IProps) {
  return (
    <Portal>
      <div
        onClick={handleClickCloseBtn}
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

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block">거래 시작</span>
          <span>
            {"saleStartDate" in tradingData
              ? getTradingDateFormat(tradingData.saleStartDate)
              : getTradingDateFormat(tradingData.purchaseStartDate)}
          </span>
        </div>

        <div className="border-b border-gray-300 pb-2">
          <span className="font-medium w-20 inline-block"> 거래 완료</span>
          <span>
            {"saleEndDate" in tradingData
              ? getTradingDateFormat(tradingData.saleEndDate || "")
              : "purchaseEndDate" in tradingData &&
                getTradingDateFormat(tradingData.purchaseEndDate || "")}
          </span>
        </div>

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
          onClick={() => {
            console.log("a");
            handleClickCloseBtn();
          }}
          className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
        >
          <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
        </button>
      </div>
    </Portal>
  );
}
