import { useRouter } from "next/router";

interface IProps {
  productId: string;
}

export default function SaleTradingEditBtn({ productId }: IProps) {
  const router = useRouter();
  const onClickEdit = () => {
    router.push(`/product/${productId}/edit`);
  };
  return (
    <button
      type="button"
      onClick={onClickEdit}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      수정하기
    </button>
  );
}
