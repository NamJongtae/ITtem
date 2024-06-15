import usePurchaseTradingReturnWithdrawalBtn from "@/hooks/productManage/usePurchaseTradingReturnWithdrawalBtn";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReturnwithdrawalBtn({
  productId,
}: IProps) {
  const { handleClickReturnWithdrawal } = usePurchaseTradingReturnWithdrawalBtn(
    { productId }
  );

  return (
    <button
      type="button"
      onClick={handleClickReturnWithdrawal}
      className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
    >
      반품 철회
    </button>
  );
}
