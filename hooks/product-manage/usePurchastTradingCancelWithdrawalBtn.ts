import useProductReceiptConfirmationMutate from "../react-query/mutations/trading/useProductReceiptConfirmationMutate";

interface IParams {
  productId: string;
}

export default function usePurchastTradingCancelWithdrawalBtn({
  productId,
}: IParams) {
  const { productReceiptConfirmationMutate } =
    useProductReceiptConfirmationMutate();

  const handleClickReceiptComfirmation = () => {
    const isReceiptConfirmation = confirm("정말 상품을 인수 확인을 하겠어요?");
    if (isReceiptConfirmation) {
      productReceiptConfirmationMutate(productId);
    }
  };

  return { handleClickReceiptComfirmation };
}
