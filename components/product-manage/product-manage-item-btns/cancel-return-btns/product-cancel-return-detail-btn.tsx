import useModal from "@/hooks/commons/useModal";
import ProductManageCancelReturnDetailModal from "../../modal/product-manage-cancel-return-detail-modal";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductCancelReturnDetailBtn({ tradingData }: IProps) {
  const { isOpenModal, openModal, closeModal } = useModal();
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
        <ProductManageCancelReturnDetailModal
          tradingData={tradingData}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
