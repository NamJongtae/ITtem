import useSaleTradingEditBtn from "@/hooks/productManage/useSaleTradingEditBtn";

interface IProps {
  productId: string;
}

export default function SaleTradingEditBtn({ productId }: IProps) {
  const { handleClickEdit } = useSaleTradingEditBtn({ productId });

  return (
    <button
      type="button"
      onClick={handleClickEdit}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      수정하기
    </button>
  );
}
