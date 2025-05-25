import useModal from "@/shared/common/hooks/useModal";
import TradeDetailModal from "../../../../modal/commons/trade-detail/Modal";
import {
  PurchaseTradingData,
  SaleTradingData
} from "@/domains/product/manage/types/productManageTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function DetailBtn({ tradingData }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        거래 상세 정보
      </button>
      {isOpenModal && (
        <TradeDetailModal
          tradingData={tradingData}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
