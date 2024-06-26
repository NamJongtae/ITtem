import useProductDeleteMutate from "../reactQuery/mutations/product/useProducDeletetMutate";

interface IPrarms {
  productId: string;
}

export default function useSaleTradingDeleteBtn({ productId }: IPrarms) {
  const { productDeleteMutate } = useProductDeleteMutate(productId);

  const handleClickProductDelete = () => {
    const isDelete = confirm("정말 삭제 하겠어요?");
    if (isDelete) {
      productDeleteMutate();
    }
  };

  return { handleClickProductDelete };
}
