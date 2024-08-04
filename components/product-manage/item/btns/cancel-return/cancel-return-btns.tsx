import useModal from "@/hooks/commons/useModal";
import CancelAndReturnDetailModal from "../../../modal/commons/cancel-return-detail/cancel-return-detail-modal";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function CancelReturnBtns({ tradingData }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  return (
    <div className="flex flex-row justify-end sm:flex-col gap-3">
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        거래 상세 정보
      </button>
      {isOpenModal && (
        <CancelAndReturnDetailModal
          tradingData={tradingData}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </div>
  );
}
