import useReturnReceiptComfirmationMutate from "../reactQuery/mutations/trade/useReturnReceiptComfirmationMutate";

interface IPrarms {
  productId: string;
}

export default function useSaleTradingReturnConfirmationBtn({
  productId,
}: IPrarms) {
  const { productReturnReceiptConfirmationMutate } =
    useReturnReceiptComfirmationMutate();

  const handleClickReturnReceiptConfirmation = () => {
    const isReturnReceiptConfirmation = confirm(
      "정말 환불상품인수 확인을 하겠어요?"
    );
    if (isReturnReceiptConfirmation) {
      productReturnReceiptConfirmationMutate(productId);
    }
  };

  return { handleClickReturnReceiptConfirmation };
}
