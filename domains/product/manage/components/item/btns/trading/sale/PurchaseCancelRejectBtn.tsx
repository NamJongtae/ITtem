import useModal from "@/shared/common/hooks/useModal";
import PurchaseCancelRejectModal from "../../../../modal/sale/PurchaseCancelRejectModal";

interface IProps {
  productId: string;
}

export default function PurchaseCancelRejectBtn({ productId }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
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
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
