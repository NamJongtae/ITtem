import useProductReturnRequestWithdrawalMutate from "../reactQuery/mutations/trading/useProductReturnRequestWithdrawalMutate";

interface IParams {
  productId: string;
}

export default function usePurchaseTradingReturnWithdrawalBtn({
  productId,
}: IParams) {
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
