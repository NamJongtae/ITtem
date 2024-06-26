import useCancelConfirmationMutate from "../reactQuery/mutations/trade/useCancelConfirmationMutate";

interface IPrarms {
  productId: string;
}

export default function useTradingCancelConfirmationBtn({
  productId,
}: IPrarms) {
  const { purchaseCancelConfirmationMutate } = useCancelConfirmationMutate();

  const handleClickCancelConfirmation = () => {
    const isCancelConfirmation = confirm("정말 취소요청을 확인 하겠어요?");
    if (isCancelConfirmation) {
      purchaseCancelConfirmationMutate(productId);
    }
  };

  return { handleClickCancelConfirmation };
}
