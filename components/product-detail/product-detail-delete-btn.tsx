import Image from "next/image";
import { ProductStatus } from "@/types/product-types";
import useProductDetailDeleteHandler from "@/hooks/product-detail/useProductDetailDeleteHandler";

interface IProps {
  productStatus: ProductStatus | undefined;
}

export default function ProductDetailDeleteBtn({ productStatus }: IProps) {
  const { handleClickDelete } =
    useProductDetailDeleteHandler({ productStatus });

  return (
    <button
      type="button"
      onClick={handleClickDelete}
      className="px-4 py-2 flex gap-2 items-center bg-red-600 text-white text-sm font-medium rounded hover:betterhover:bg-red-500 focus:outline-none focus:bg-red-500 md:px-6"
    >
      <Image
        src={"/icons/delete-icon.svg"}
        width={20}
        height={20}
        alt="삭제하기"
      />
      삭제하기
    </button>
  );
}
