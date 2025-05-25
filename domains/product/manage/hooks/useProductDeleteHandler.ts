import useProductDeleteMutate from "../../shared/hooks/mutations/useProducDeletetMutate";

interface IParams {
  productId: string;
}

export default function useProductDeleteHandler({ productId }: IParams) {
  const { productDeleteMutate } = useProductDeleteMutate(productId);

  const onClickProductDelete = () => {
    const isDelete = confirm("정말 삭제 하겠어요?");
    if (isDelete) {
      productDeleteMutate();
    }
  };

  return { onClickProductDelete };
}
