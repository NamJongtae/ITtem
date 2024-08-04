import useModal from "@/hooks/commons/useModal";
import PurchaseCancelModal from "../../../../modal/purchase/purchase-cancel-modal";

interface IProps {
  productId: string;
}

export default function PurchaseTradingCancelBtn({ productId }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
      >
        구매 취소
      </button>
      {isOpenModal && (
        <PurchaseCancelModal
          productId={productId}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
