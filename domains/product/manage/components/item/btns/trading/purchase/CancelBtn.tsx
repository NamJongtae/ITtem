import useModal from "@/shared/common/hooks/useModal";
import PurchaseCancelModal from "../../../../modal/purchase/PurchaseCancelModal";

interface IProps {
  productId: string;
}

export default function CancelBtn({ productId }: IProps) {
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
