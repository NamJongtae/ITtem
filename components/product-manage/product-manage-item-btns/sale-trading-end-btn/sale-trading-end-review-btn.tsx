import React from "react";
import ReviewModal from "../../modal/commons/reviewModal/review-modal";
import useModal from "@/hooks/commons/useModal";

interface IProps {
  productId: string;
}

export default function SaleTradingEndReviewBtn({ productId }: IProps) {
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
