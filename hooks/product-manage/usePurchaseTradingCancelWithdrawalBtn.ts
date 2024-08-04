import usePurchaseCancelRequestWithdrawalMutate from "../react-query/mutations/trading/usePurchaseCancelRequestWithdrawalMutate";

interface IParams {
  productId: string;
}

export default function usePurchaseTradingCancelWithdrawalBtn({
  productId,
}: IParams) {
  const { purchaseCancelRequestWithdrawalMutate } =
    usePurchaseCancelRequestWithdrawalMutate();

  const onClickCancelWithdrawal = () => {
    const isCancelWithdrawal = confirm("정말 취소요청을 철회 하겠어요?");
    if (isCancelWithdrawal) {
      purchaseCancelRequestWithdrawalMutate(productId);
    }
  };

  return { onClickCancelWithdrawal };
}
