import useModal from "@/hooks/commons/useModal";
import PurchaseCancelRejectModal from "../../modal/seller/purchase-cancel-reject-modal";

interface IProps {
  productId: string;
}

export default function SaleTradingPurchaseCancelRejectBtn({
  productId,
}: IProps) {
  const { isOpenModal, closeModal, openModal } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
      >
        취소요청 거절
      </button>
      {isOpenModal && (
        <PurchaseCancelRejectModal
          productId={productId}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
