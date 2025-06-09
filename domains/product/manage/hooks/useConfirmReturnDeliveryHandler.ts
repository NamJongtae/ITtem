import useProductReturnDeliveryConfirmationMutate from "./mutations/useProductReturnDeliveryConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useConfirmReturnDeliveryHandler({
  productId
}: IParams) {
  const { productReturnDeliveryConfirmationMutate } =
    useProductReturnDeliveryConfirmationMutate();

  const onClickReturnDeliveryConfirmation = () => {
    const isReturnDeliveryConfirmation = confirm(
      "정말 반품 상품 전달 확인을 하겠어요?"
    );
    if (isReturnDeliveryConfirmation) {
      productReturnDeliveryConfirmationMutate(productId);
    }
  };

  return { onClickReturnDeliveryConfirmation };
}
