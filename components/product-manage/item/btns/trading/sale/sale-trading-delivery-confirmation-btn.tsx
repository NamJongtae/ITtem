import useDeliveryConfirmationHandler from "@/hooks/product-manage/useDeliveryConfirmationHandler";

interface IProps {
  productId: string;
}

export default function SaleTradingDeliveryConfirmationBtn({
  productId,
}: IProps) {
  const { onClickDeliveryConfirmation } =
  useDeliveryConfirmationHandler({ productId });

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
