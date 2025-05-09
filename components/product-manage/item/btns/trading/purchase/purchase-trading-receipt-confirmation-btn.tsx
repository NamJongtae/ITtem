import useReceiptConfirmationHandler from "@/hooks/product-manage/useReceiptConfirmationHandler";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReceiptConfirmationBtn({
  productId
}: IProps) {
  const { onClickReceiptComfirmation } = useReceiptConfirmationHandler({
    productId
  });
  return (
    <button
      type="button"
      onClick={onClickReceiptComfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      상품 인수 확인
    </button>
  );
}
