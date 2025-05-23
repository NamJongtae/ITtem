import useModal from "@/hooks/useModal";
import ReviewUploadModal from "@/domains/product/components/manage/modal/commons/review-upload/review-upload-modal";

interface IProps {
  productId: string;
}

export default function TradingEndPurchaseReviewUploadBtn({
  productId
}: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        리뷰 작성
      </button>
      {isOpenModal && (
        <ReviewUploadModal
          productId={productId}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
