import Portal from "@/components/commons/portal/Portal";
import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";
import { isMobile } from "react-device-detect";
import CancelReturnDetailModalContent from "./cancel-return-detail-modal-content";
import CancelReutrnDeatilModalReason from "./cancel-return-detail-modal-reason";
import CancelReturnDetailModalDate from "./cancel-return-detail-modal-date";
import CancelReturnDetailModalCloseBtn from "./cancel-return-detail-modal-close-btn";
import { escKeyClose } from "@/lib/optimizationKeyboard";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  handleClickCloseBtn: () => void;
}

export default function CancleReturnDetailModal({
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

        <CancelReturnDetailModalContent
          name="상품명"
          value={tradingData.productName}
        />

        <CancelReturnDetailModalContent
          name="상품가격"
          value={tradingData.productPrice + " 원"}
        />

        <CancelReturnDetailModalContent
          name="판매자"
          value={tradingData.sellerInfo.nickname}
        />

        <CancelReturnDetailModalContent
          name="구매자"
          value={tradingData.buyerInfo.nickname}
        />

        <CancelReutrnDeatilModalReason tradingData={tradingData} />

        <CancelReturnDetailModalDate tradingData={tradingData} />

        <CancelReturnDetailModalContent
          name="거래 번호"
          value={tradingData._id}
        />

        <CancelReturnDetailModalContent
          name="상품 번호"
          value={tradingData.productId}
        />

        <p className="text-sm text-gray-400">
          * 거래 정보가 상이한 경우 고객센터로 문의 바랍니다.
        </p>

        <CancelReturnDetailModalCloseBtn
          handleClickCloseBtn={handleClickCloseBtn}
        />
      </div>
    </Portal>
  );
}
