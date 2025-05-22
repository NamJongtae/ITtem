import useCancelConfirmationMutate from "./mutations/useCancelConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useCancelConfirmationHandler({ productId }: IParams) {
  const { purchaseCancelConfirmationMutate } = useCancelConfirmationMutate();

  const onClickCancelConfirmation = () => {
    const isCancelConfirmation = confirm("정말 취소요청을 확인 하겠어요?");
    if (isCancelConfirmation) {
      purchaseCancelConfirmationMutate(productId);
    }
  };

  return { onClickCancelConfirmation };
}
