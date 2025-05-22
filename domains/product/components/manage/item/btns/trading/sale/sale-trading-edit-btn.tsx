import useProductEditNavigation from "@/domains/product/hooks/manage/useProductEditNavigation";

interface IProps {
  productId: string;
}

export default function SaleTradingEditBtn({ productId }: IProps) {
  const { goToProductEditPage } = useProductEditNavigation({ productId });

  return (
    <button
      type="button"
      onClick={goToProductEditPage}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      수정하기
    </button>
  );
}
