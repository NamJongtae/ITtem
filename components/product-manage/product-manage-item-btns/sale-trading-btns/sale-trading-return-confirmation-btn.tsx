import useReturnConfirmationMutate from "@/hooks/reactQuery/mutations/trade/useReturnConfirmationMutate";
import React from "react";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnConfirmationBtn({
  productId,
}: IProps) {
  const { productReturnConfirmationMutate } = useReturnConfirmationMutate();

  const onClickReturnConfirmation = () => {
    const isReturnConfirmation = confirm("정말 환불요청을 확인 하겠어요?");
    if (isReturnConfirmation) {
      productReturnConfirmationMutate(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickReturnConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품요청 확인
    </button>
  );
}
