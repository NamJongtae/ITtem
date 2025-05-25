import usePurchaseRequestConfirmationHandler from "@/domains/product/manage/hooks/usePurchaseRequestConfirmationHandler";

interface IProps {
  productId: string;
}
export default function PurchaseConfirmationBtn({ productId }: IProps) {
  const { onClickPurchaseRequestConfirmation } =
    usePurchaseRequestConfirmationHandler({ productId });

  return (
    <button
      type="button"
      onClick={onClickPurchaseRequestConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      구매요청 확인
    </button>
  );
}
