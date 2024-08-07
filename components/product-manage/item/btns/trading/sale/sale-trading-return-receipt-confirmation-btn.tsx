import useSaleTradingReturnReceiptConfirmationBtn from "@/hooks/product-manage/useSaleTraingReturnReceiptConfirmationBtn";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnReceiptConfirmationBtn({
  productId,
}: IProps) {
  const { handleClickReturnReceiptConfirmation } =
    useSaleTradingReturnReceiptConfirmationBtn({ productId });

  return (
    <button
      type="button"
      onClick={handleClickReturnReceiptConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품상품인수 확인
    </button>
  );
}
