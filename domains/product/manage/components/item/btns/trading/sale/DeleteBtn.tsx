import useProductDeleteHandler from "@/domains/product/manage/hooks/useProductDeleteHandler";

interface IProps {
  productId: string;
}

export default function DeleteBtn({ productId }: IProps) {
  const { onClickProductDelete } = useProductDeleteHandler({ productId });
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
