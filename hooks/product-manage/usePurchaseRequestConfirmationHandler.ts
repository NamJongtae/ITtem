import usePurchaseRequestConfirmationMutate from "../react-query/mutations/trading/usePurchaseRequestConfirmationMutate";

interface IParams {
  productId: string;
}

export default function usePurchaseRequestConfirmationHandler({
  productId
}: IParams) {
  const { purchaseRequestConfirmationMutate } =
    usePurchaseRequestConfirmationMutate();

  const onClickPurchaseRequestConfirmation = () => {
    const isPurchaseRequestConfirmation =
      confirm("정말 구매요청을 확인 하겠어요?");
    if (isPurchaseRequestConfirmation) {
      purchaseRequestConfirmationMutate(productId);
    }
  };

  return { onClickPurchaseRequestConfirmation };
}
