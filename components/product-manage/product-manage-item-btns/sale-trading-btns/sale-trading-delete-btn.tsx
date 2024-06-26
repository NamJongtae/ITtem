import useSaleTradingDeleteBtn from "@/hooks/productManage/useSaleTradingDeleteBtn";

interface IProps {
  productId: string;
}

export default function SaleTradingDeleteBtn({ productId }: IProps) {
  const { handleClickProductDelete } = useSaleTradingDeleteBtn({ productId });
  return (
    <button
      type="button"
      onClick={handleClickProductDelete}
      className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
    >
      삭제하기
    </button>
  );
}
