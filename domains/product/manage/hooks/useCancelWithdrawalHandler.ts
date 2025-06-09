import usePurchaseCancelRequestWithdrawalMutate from "./mutations/usePurchaseCancelRequestWithdrawalMutate";

interface IParams {
  productId: string;
}

export default function useCancelWithdrawalHandler({ productId }: IParams) {
  const { purchaseCancelRequestWithdrawalMutate } =
    usePurchaseCancelRequestWithdrawalMutate();

  const onClickCancelWithdrawal = () => {
    const isCancelWithdrawal = confirm("정말 취소 요청을 철회 하겠어요?");
    if (isCancelWithdrawal) {
      purchaseCancelRequestWithdrawalMutate(productId);
    }
  };

  return { onClickCancelWithdrawal };
}
