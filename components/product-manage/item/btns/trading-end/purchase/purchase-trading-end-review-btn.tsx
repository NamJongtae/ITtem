import useModal from "@/hooks/commons/useModal";
import ReviewModal from "@/components/product-manage/modal/commons/review/review-modal";

interface IProps {
  productId: string;
}

export default function TradingEndPurchaseReviewBtn({ productId }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        리뷰 보기
      </button>
      {isOpenModal && (
        <ReviewModal
          productId={productId}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
