import useModal from "@/hooks/commons/useModal";
import React from "react";
import ProductReturnModal from "../modal/buyer/product-return-modal";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReturnBtn({ productId }: IProps) {
  const { isOpenModal, openModal, closeModal } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
      >
        반품요청
      </button>
      {isOpenModal && (
        <ProductReturnModal productId={productId} closeModal={closeModal} />
      )}
    </>
  );
}