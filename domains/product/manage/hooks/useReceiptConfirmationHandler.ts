import useProductReceiptConfirmationMutate from "./mutations/useProductReceiptConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useReceiptConfirmationHandler({ productId }: IParams) {
  const { productReceiptConfirmationMutate } =
    useProductReceiptConfirmationMutate();

  const onClickReceiptComfirmation = () => {
    const isReceiptConfirmation = confirm("정말 상품 인수 확인을 하겠어요?");
    if (isReceiptConfirmation) {
      productReceiptConfirmationMutate(productId);
    }
  };

  return { onClickReceiptComfirmation };
}
