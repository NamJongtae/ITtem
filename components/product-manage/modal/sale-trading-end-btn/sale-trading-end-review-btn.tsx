import React from "react";
import ProductManageReviewModal from "../product-manage-review-modal";
import useModal from "@/hooks/commons/useModal";

interface IProps {
  productId: string;
}

export default function SaleTradingEndReviewBtn({ productId }: IProps) {
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
