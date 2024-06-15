import useProductReturnRequestWithdrawalMutate from "../reactQuery/mutations/trade/useProductReturnRequestWithdrawalMutate";

interface IPrarms {
  productId: string;
}

export default function usePurchaseTradingReturnWithdrawalBtn({
  productId,
}: IPrarms) {
  const { productReturnRequestWithdrawalMutate } =
    useProductReturnRequestWithdrawalMutate();

  const handleClickReturnWithdrawal = () => {
    const isReturnWithdrawal = confirm("정말 반품요청을 철회 하겠어요?");
    if (isReturnWithdrawal) {
      productReturnRequestWithdrawalMutate(productId);
    }
  };

  return { handleClickReturnWithdrawal };
}
