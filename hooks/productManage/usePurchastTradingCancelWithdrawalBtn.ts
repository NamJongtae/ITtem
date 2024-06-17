import useProductReceiptConfirmationMutate from "../reactQuery/mutations/product/useProductReceiptConfirmationMutate";

interface IPrarms {
  productId: string;
}

export default function usePurchastTradingCancelWithdrawalBtn({
  productId,
}: IPrarms) {
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