import usePurchaseTradingCancelWithdrawalBtn from "@/hooks/product-manage/usePurchaseTradingCancelWithdrawalBtn";

interface IProps {
  productId: string;
}

export default function PurchaseTradingCancelWithdrawalBtn({
  productId,
}: IProps) {
  const { onClickCancelWithdrawal } = usePurchaseTradingCancelWithdrawalBtn({
    productId,
  });

  return (
    <button
      type="button"
      onClick={onClickCancelWithdrawal}
      className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
    >
      취소 철회
    </button>
  );
}
