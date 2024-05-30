import useProductReturnDeliveryConfirmationMutate from "@/hooks/querys/useProductReturnDeliveryConfirmationMutate";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReturnDeliveryConfirmationBtn({
  productId,
}: IProps) {
  const { productReturnDeliveryConfirmationMutate } =
    useProductReturnDeliveryConfirmationMutate();

  const onClickDeliveryConfirmation = () => {
    const isDeliveryConfirmation = confirm("정말 상품전달확인을 하겠어요?");
    if (isDeliveryConfirmation) {
      productReturnDeliveryConfirmationMutate(productId);
    }
  };
  return (
    <button
      type="button"
      onClick={onClickDeliveryConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품 상품 전달 확인
    </button>
  );
}
