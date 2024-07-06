import useReturnConfirmationMutate from "../reactQuery/mutations/trading/useReturnConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useSaleTradingReturnConfirmationBtn({
  productId,
}: IParams) {
  const { productReturnConfirmationMutate } = useReturnConfirmationMutate();

  const handleClickReturnConfirmation = () => {
    const isReturnConfirmation = confirm("정말 반품 요청을 확인 하겠어요?");
    if (isReturnConfirmation) {
      productReturnConfirmationMutate(productId);
    }
  };

  return { handleClickReturnConfirmation };
}
