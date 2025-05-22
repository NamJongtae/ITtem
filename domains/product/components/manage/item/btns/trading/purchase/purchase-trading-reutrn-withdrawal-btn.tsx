import useReturnWithdrawalHandler from "@/domains/product/hooks/manage/useReturnWithdrawalHandler";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReturnWithdrawalBtn({
  productId
}: IProps) {
  const { onClickReturnWithdrawal } = useReturnWithdrawalHandler({ productId });

  return (
    <button
      type="button"
      onClick={onClickReturnWithdrawal}
      className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
    >
      반품 철회
    </button>
  );
}
