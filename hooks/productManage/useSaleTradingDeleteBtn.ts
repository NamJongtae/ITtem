import useProductDeleteMutate from "../reactQuery/mutations/product/useProducDeletetMutate";

interface IParams {
  productId: string;
}

export default function useSaleTradingDeleteBtn({ productId }: IParams) {
  const { productDeleteMutate } = useProductDeleteMutate(productId);

  const handleClickProductDelete = () => {
    const isDelete = confirm("정말 삭제 하겠어요?");
    if (isDelete) {
      productDeleteMutate();
    }
  };

  return { handleClickProductDelete };
}
