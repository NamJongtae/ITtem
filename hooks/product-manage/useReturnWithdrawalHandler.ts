import useProductReturnRequestWithdrawalMutate from "../react-query/mutations/trading/useProductReturnRequestWithdrawalMutate";

interface IParams {
  productId: string;
}

export default function useReturnWithdrawalHandler({ productId }: IParams) {
  const { productReturnRequestWithdrawalMutate } =
    useProductReturnRequestWithdrawalMutate();

  const onClickReturnWithdrawal = () => {
    const isReturnWithdrawal = confirm("정말 반품요청을 철회 하겠어요?");
    if (isReturnWithdrawal) {
      productReturnRequestWithdrawalMutate(productId);
    }
  };

  return { onClickReturnWithdrawal };
}
