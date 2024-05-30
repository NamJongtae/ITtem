import usePurchaseRequestConfirmationMutate from "@/hooks/querys/usePurchaseRequestConfirmationMutate";

interface IProps {
  productId: string;
}
export default function SaleTradingPurchaseConfirmationBtn({
  productId,
}: IProps) {
  const { purchaseRequestConfirmationMutate } =
    usePurchaseRequestConfirmationMutate();

  const onClickPurchaseRequestConfirmation = () => {
    const isPurchaseRequestConfirmation =
      confirm("정말 구매요청을 확인 하겠어요?");
    if (isPurchaseRequestConfirmation) {
      purchaseRequestConfirmationMutate(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickPurchaseRequestConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      구매요청 확인
    </button>
  );
}
