import useDeliveryConfirmationMutate from "../reactQuery/mutations/trade/useDeliveryConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useSaleTradingDeliveryConfirmationBtn({
  productId,
}: IParams) {
  const { productDeliveryConfirmationMutate } = useDeliveryConfirmationMutate();

  const handleClickDeliveryConfirmation = () => {
    const isDeliveryConfirmation = confirm("정말 물품전달 확인을 하겠어요?");
    if (isDeliveryConfirmation) {
      productDeliveryConfirmationMutate(productId);
    }
  };

  return { handleClickDeliveryConfirmation };
}
