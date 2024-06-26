import usePurchaseRequestConfirmationMutate from "../reactQuery/mutations/trade/usePurchaseRequestConfirmationMutate";

interface IPrarms {
  productId: string;
}

export default function useSaleTradingPurchaseConfirmationBtn({
  productId,
}: IPrarms) {
  const { purchaseRequestConfirmationMutate } =
    usePurchaseRequestConfirmationMutate();

  const handleClickPurchaseRequestConfirmation = () => {
    const isPurchaseRequestConfirmation =
      confirm("정말 구매요청을 확인 하겠어요?");
    if (isPurchaseRequestConfirmation) {
      purchaseRequestConfirmationMutate(productId);
    }
  };

  return { handleClickPurchaseRequestConfirmation };
}
