import useProductDeleteMutate from "@/hooks/querys/useProducDeletetMutate";
import Loading from "../commons/loading";

export default function ProductDetailDeleteBtn() {
  const { productDeleteMutate, productDeleteLoading } =
    useProductDeleteMutate();

  if (productDeleteLoading) {
    return <Loading />;
  }

  return (
    <button
      type="button"
      onClick={() => productDeleteMutate()}
      className="px-8 py-2 bg-red-600 text-white text-sm font-medium rounded hover:betterhover:bg-red-500 focus:outline-none focus:bg-red-500 md:px-6"
    >
      삭제하기
    </button>
  );
}
