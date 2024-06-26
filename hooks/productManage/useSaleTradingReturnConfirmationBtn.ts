import useReturnConfirmationMutate from "../reactQuery/mutations/trade/useReturnConfirmationMutate";

interface IPrarms {
  productId: string;
}

export default function useSaleTradingReturnConfirmationBtn({
  productId,
}: IPrarms) {
  const { productReturnConfirmationMutate } = useReturnConfirmationMutate();

  const handleClickReturnConfirmation = () => {
    const isReturnConfirmation = confirm("정말 환불요청을 확인 하겠어요?");
    if (isReturnConfirmation) {
      productReturnConfirmationMutate(productId);
    }
  };

  return { handleClickReturnConfirmation };
}
