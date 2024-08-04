import useModal from "@/hooks/commons/useModal";
import TradeDetailModal from "@/components/product-manage/modal/commons/trade-detail/trade-detail-modal";
import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function TradingEndPurchaseTradingDetailBtn({
  tradingData,
}: IProps) {
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
