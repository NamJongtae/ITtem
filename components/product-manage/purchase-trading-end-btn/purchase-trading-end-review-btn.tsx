import useModal from "@/hooks/commons/useModal";
import ProductManageReviewModal from "../modal/product-manage-review-modal";

interface IProps {
  productId: string;
}

export default function PurchaseTradingEndReviewBtn({ productId }: IProps) {
  const { isOpenModal, openModal, closeModal } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        리뷰보기
      </button>
      {isOpenModal && (
        <ProductManageReviewModal
          productId={productId}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
