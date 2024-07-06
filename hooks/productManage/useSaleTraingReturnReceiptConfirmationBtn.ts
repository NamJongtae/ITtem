import useReturnReceiptComfirmationMutate from "../reactQuery/mutations/trading/useReturnReceiptComfirmationMutate";

interface IParams {
  productId: string;
}

export default function useSaleTradingReturnReceiptConfirmationBtn({
  productId,
}: IParams) {
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
