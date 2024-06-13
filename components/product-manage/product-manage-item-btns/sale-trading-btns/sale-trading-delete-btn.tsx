import useProductDeleteMutate from "@/hooks/reactQuery/mutations/product/useProducDeletetMutate";

interface IProps {
  productId: string;
}

export default function SaleTradingDeleteBtn({ productId }: IProps) {
  const { productDeleteMutate } = useProductDeleteMutate(productId);

  const onClickProductDelete = () => {
    const isDelete = confirm("정말 삭제 하겠어요?");
    if (isDelete) {
      productDeleteMutate();
    }
  };
  return (
    <button
      type="button"
      onClick={onClickProductDelete}
      className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
    >
      삭제하기
    </button>
  );
}
