import useReturnReceiptComfirmationMutate from "./mutations/useReturnReceiptComfirmationMutate";

interface IParams {
  productId: string;
}

export default function useReturnReceiptConfirmationHandler({
  productId
}: IParams) {
  const { productReturnReceiptConfirmationMutate } =
    useReturnReceiptComfirmationMutate();

  const onClickReturnReceiptConfirmation = () => {
    const isReturnReceiptConfirmation = confirm(
      "정말 환불상품인수 확인을 하겠어요?"
    );
    if (isReturnReceiptConfirmation) {
      productReturnReceiptConfirmationMutate(productId);
    }
  };

  return { onClickReturnReceiptConfirmation };
}
