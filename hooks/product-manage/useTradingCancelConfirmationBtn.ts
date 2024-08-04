import useCancelConfirmationMutate from "../react-query/mutations/trading/useCancelConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useTradingCancelConfirmationBtn({
  productId,
}: IParams) {
  const { purchaseCancelConfirmationMutate } = useCancelConfirmationMutate();

  const handleClickCancelConfirmation = () => {
    const isCancelConfirmation = confirm("정말 취소요청을 확인 하겠어요?");
    if (isCancelConfirmation) {
      purchaseCancelConfirmationMutate(productId);
    }
  };

  return { handleClickCancelConfirmation };
}
