import useProductReturnRequestWithdrawalMutate from "@/hooks/querys/useProductReturnRequestWithdrawalMutate";

interface IProps {
  productId: string;
}

export default function PurchaseTradingReturnwithdrawalBtn({
  productId,
}: IProps) {
  const { productReturnRequestWithdrawalMutate } =
    useProductReturnRequestWithdrawalMutate();

  const onClickReturnWithdrawal = () => {
    const isReturnWithdrawal = confirm("정말 반품요청을 철회 하겠어요?");
    if (isReturnWithdrawal) {
      productReturnRequestWithdrawalMutate(productId);
    }
  };

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
