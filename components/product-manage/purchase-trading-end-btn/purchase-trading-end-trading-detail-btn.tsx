import useModal from "@/hooks/commons/useModal";
import React from "react";
import ProductManageTradingDetailModal from "../modal/product-manage-trading-detail-modal";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function PurchaseTradingEndTradingDetailBtn({
  tradingData,
}: IProps) {
  const { isOpenModal, openModal, closeModal } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        거래 상세 정보
      </button>
      {isOpenModal && (
        <ProductManageTradingDetailModal
          tradingData={tradingData}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
