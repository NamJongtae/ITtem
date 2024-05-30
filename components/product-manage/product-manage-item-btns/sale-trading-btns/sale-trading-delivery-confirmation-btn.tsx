import useDeliveryConfirmationMutate from "@/hooks/querys/useDeliveryConfirmationMutate";

interface IProps {
  productId: string;
}

export default function SaleTradingDeliveryConfirmationBtn({
  productId,
}: IProps) {
  const { productDeliveryConfirmationMutate } = useDeliveryConfirmationMutate();

  const onClickDeliveryConfirmation = () => {
    const isDeliveryConfirmation = confirm("정말 물품전달 확인을 하겠어요?");
    if (isDeliveryConfirmation) {
      productDeliveryConfirmationMutate(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickDeliveryConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      상품전달 확인
    </button>
  );
}
