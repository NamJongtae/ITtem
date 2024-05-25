import useReturnReceiptComfirmationMutate from "@/hooks/querys/useReturnReceiptComfirmationMutate";
import React from "react";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnReceiptComfirmationBtn({
  productId,
}: IProps) {
  const { productReturnReceiptConfirmationMutate } =
    useReturnReceiptComfirmationMutate();
  return (
    <button
      type="button"
      onClick={() => productReturnReceiptConfirmationMutate(productId)}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품상품인수 확인
    </button>
  );
}
