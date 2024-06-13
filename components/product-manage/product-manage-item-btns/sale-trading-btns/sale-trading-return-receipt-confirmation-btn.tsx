import useReturnReceiptComfirmationMutate from "@/hooks/reactQuery/mutations/trade/useReturnReceiptComfirmationMutate";
import React from "react";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnReceiptConfirmationBtn({
  productId,
}: IProps) {
  const { productReturnReceiptConfirmationMutate } =
    useReturnReceiptComfirmationMutate();
  const onClickReturnReceiptConfirmation = () => {
    const isReturnReceiptConfirmation = confirm(
      "정말 환불상품인수 확인을 하겠어요?"
    );
    if (isReturnReceiptConfirmation) {
      productReturnReceiptConfirmationMutate(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickReturnReceiptConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품상품인수 확인
    </button>
  );
}
