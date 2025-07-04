import useDeliveryConfirmationMutate from "./mutations/useDeliveryConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useDeliveryConfirmationHandler({ productId }: IParams) {
  const { productDeliveryConfirmationMutate } = useDeliveryConfirmationMutate();

  const onClickDeliveryConfirmation = () => {
    const isDeliveryConfirmation = confirm("정말 상품 전달 확인을 하겠어요?");
    if (isDeliveryConfirmation) {
      productDeliveryConfirmationMutate(productId);
    }
  };

  return { onClickDeliveryConfirmation };
}
