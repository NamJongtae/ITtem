import useCancelConfirmationMutate from "@/hooks/reactQuery/mutations/trade/useCancelConfirmationMutate";

interface IProps {
  productId: string;
}

export default function SaleTradingCancelConfirmationBtn({
  productId,
}: IProps) {
  const { purchaseCancelConfirmationMutate } = useCancelConfirmationMutate();

  const onClickCancelConfirmation = () => {
    const isCancelConfirmation = confirm("정말 취소요청을 확인 하겠어요?");
    if (isCancelConfirmation) {
      purchaseCancelConfirmationMutate(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickCancelConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      취소요청 확인
    </button>
  );
}
