import Portal from "@/components/commons/portal/Portal";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { isMobile } from "react-device-detect";
import CancelAndReturnDetailModalContent from "./cancel-and-return-detail-modal-content";
import CancelAndReutrnDeatilModalReason from "./cancel-and-reutrn-deatil-modal-reason";
import CancelAndReturnDetailModalDate from "./cancel-and-reurn-detail-modal-date";
import CancelAndReturnDetailModalCloseBtn from "./cancel-and-return-detail-modal-close-btn";
import { escKeyClose } from "@/lib/optimizationKeyboard";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  handleClickCloseBtn: () => void;
}

export default function CancelAndReturnDetailModal({
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
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: handleClickCloseBtn })
        }
      >
        <h2
          className={`${
            isMobile ? "mt-10" : "mt-3"
          } text-xl text-center font-semibold mb-3`}
        >
          거래 상세 정보
        </h2>

        <CancelAndReturnDetailModalContent
          name="상품명"
          value={tradingData.productName}
        />

        <CancelAndReturnDetailModalContent
          name="상품가격"
          value={tradingData.productPrice + " 원"}
        />

        <CancelAndReturnDetailModalContent
          name="판매자"
          value={tradingData.sellerInfo.nickname}
        />

        <CancelAndReturnDetailModalContent
          name="구매자"
          value={tradingData.buyerInfo.nickname}
        />

        <CancelAndReutrnDeatilModalReason tradingData={tradingData} />

        <CancelAndReturnDetailModalDate tradingData={tradingData} />

        <CancelAndReturnDetailModalContent
          name="거래 번호"
          value={tradingData._id}
        />

        <CancelAndReturnDetailModalContent
          name="상품 번호"
          value={tradingData.productId}
        />

        <p className="text-sm text-gray-400">
          * 거래 정보가 상이한 경우 고객센터로 문의 바랍니다.
        </p>

        <CancelAndReturnDetailModalCloseBtn
          handleClickCloseBtn={handleClickCloseBtn}
        />
      </div>
    </Portal>
  );
}
