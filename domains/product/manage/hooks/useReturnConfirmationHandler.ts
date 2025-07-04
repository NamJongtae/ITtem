import useReturnConfirmationMutate from "./mutations/useReturnConfirmationMutate";

interface IParams {
  productId: string;
}

export default function useReturnConfirmationHandler({ productId }: IParams) {
  const { productReturnConfirmationMutate } = useReturnConfirmationMutate();

  const onClickReturnConfirmation = () => {
    const isReturnConfirmation = confirm("정말 상품 반품 요청을 확인 하겠어요?");
    if (isReturnConfirmation) {
      productReturnConfirmationMutate(productId);
    }
  };

  return { onClickReturnConfirmation };
}
