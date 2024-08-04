import useSaleTradingPurchaseConfirmationBtn from "@/hooks/product-manage/useSaleTradingPurchaseConfirmationBtn";

interface IProps {
  productId: string;
}
export default function SaleTradingPurchaseConfirmationBtn({
  productId,
}: IProps) {
  const { handleClickPurchaseRequestConfirmation } =
    useSaleTradingPurchaseConfirmationBtn({ productId });

  return (
    <button
      type="button"
      onClick={handleClickPurchaseRequestConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      구매요청 확인
    </button>
  );
}
