import useModal from "@/shared/common/hooks/useModal";
import Modal from "../../../../modal/commons/review-upload/Modal";

interface IProps {
  productId: string;
}

export default function ReviewUploadBtn({ productId }: IProps) {
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
        <Modal
          productId={productId}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
