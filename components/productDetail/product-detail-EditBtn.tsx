import { useRouter } from "next/router";

export default function ProductDetailEditBtn() {
  const router = useRouter();
  const productId = router.query?.productId;

  const handleClickEdit = () => {
    router.push(`/product/${productId}/edit`);
  };
  return (
    <button
      type="button"
      onClick={handleClickEdit}
      className="px-8 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:betterhover:bg-yellow-400 focus:outline-none focus:bg-yellow-500 md:px-6"
    >
      수정하기
    </button>
  );
}
