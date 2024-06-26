import useModal from "@/hooks/commons/useModal";
import ReviewUploadModal from "../../modal/commons/reviewUploadModal/review-upload-modal";

interface IProps {
  productId: string;
}

export default function PurchaseTradingEndReviewUploadBtn({
  productId,
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
