import usePurchaseCancelRequestWithdrawalMutate from "../reactQuery/mutations/trade/usePurchaseCancelRequestWithdrawalMutate";

interface IPrarms {
  productId: string;
}

export default function usePurchaseTradingCancelWithdrawalBtn({
  productId,
}: IPrarms) {
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
