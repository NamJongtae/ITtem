import usePurchaseTradingReturnDeliveryComfirmationBtn from "@/domains/product/manage/hooks/useConfirmReturnDeliveryHandler";

interface IProps {
  productId: string;
}

export default function ReturnDeliveryConfirmationBtn({ productId }: IProps) {
  const { onClickReturnDeliveryConfirmation } =
    usePurchaseTradingReturnDeliveryComfirmationBtn({ productId });

  return (
    <button
      type="button"
      onClick={onClickReturnDeliveryConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품 상품 전달 확인
    </button>
  );
}
