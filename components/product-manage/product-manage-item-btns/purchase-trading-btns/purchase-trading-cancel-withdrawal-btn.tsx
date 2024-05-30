import usePurchaseCancelRequestWithdrawalMutate from "@/hooks/querys/usePurchaseCancelRequestWithdrawalMutate";

interface IProps {
  productId: string;
}

export default function PurchaseTradingCancelWithdrawalBtn({
  productId,
}: IProps) {
  const { purchaseCancelRequestWithdrawalMutate } =
    usePurchaseCancelRequestWithdrawalMutate();

  const onClickCancelWithdrawal = () => {
    const isCancelWithdrawal = confirm("정말 취소요청을 철회 하겠어요?");
    if (isCancelWithdrawal) {
      purchaseCancelRequestWithdrawalMutate(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickCancelWithdrawal}
      className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
    >
      취소 철회
    </button>
  );
}
