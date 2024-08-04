import usePurchastTradingCancelWithdrawalBtn from "@/hooks/product-manage/usePurchastTradingCancelWithdrawalBtn";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReceiptConfirmationBtn({
  productId,
}: IProps) {
  const { handleClickReceiptComfirmation } =
    usePurchastTradingCancelWithdrawalBtn({ productId });
  return (
    <button
      type="button"
      onClick={handleClickReceiptComfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      상품 인수 확인
    </button>
  );
}
