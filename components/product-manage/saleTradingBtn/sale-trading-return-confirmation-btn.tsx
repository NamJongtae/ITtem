import useReturnConfirmationMutate from "@/hooks/querys/useReturnConfirmationMutate";
import React from "react";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnConfirmationBtn({
  productId,
}: IProps) {
  const { productReturnConfirmationMutate } = useReturnConfirmationMutate();
  return (
    <button
      type="button"
      onClick={() => productReturnConfirmationMutate(productId)}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품요청 확인
    </button>
  );
}
