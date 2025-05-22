import useProductReturnDeliveryConfirmationMutate from "./mutations/useProductReturnDeliveryConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useConfirmReturnDeliveryHandler({
  productId
}: IParams) {
  const { productReturnDeliveryConfirmationMutate } =
    useProductReturnDeliveryConfirmationMutate();

  const onClickDeliveryConfirmation = () => {
    const isDeliveryConfirmation = confirm("정말 상품전달확인을 하겠어요?");
    if (isDeliveryConfirmation) {
      productReturnDeliveryConfirmationMutate(productId);
    }
  };

  return { onClickDeliveryConfirmation };
}
