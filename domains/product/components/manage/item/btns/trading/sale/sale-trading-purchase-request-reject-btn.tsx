import useModal from "@/hooks/useModal";
import PurchaseRequestRejectModal from "../../../../modal/sale/purchase-request-reject-modal";

interface IProps {
  productId: string;
}

export default function SaleTradingPurchaseRequestRejectBtn({
  productId
}: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
      >
        구매요청 거절
      </button>
      {isOpenModal && (
        <PurchaseRequestRejectModal
          productId={productId}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
