import useProductQuery from "@/domains/product/shared/hooks/queries/useProductQuery";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  productId: string;
}

export default function HeaderProduct({ productId }: IProps) {
  const { productData, productLoading } = useProductQuery(productId);

  if (!productData || productLoading) {
    return (
      <div className="rounded-full w-10 h-10">
        <span className="sr-only">loading</span>
      </div>
    );
  }
  return (
    <Link className="flex gap-2" href={`/product/${productData._id}`}>
      <Image
        className="rounded-full w-10 h-10 object-cover object-center"
        src={productData?.imgData[0].url || ""}
        alt={productData?.name || ""}
        width={40}
        height={40}
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm line-clamp-1">{productData?.name}</span>
        </div>
        <span className="block text-xs font-semibold text-gray-400">
          {productData?.price.toLocaleString()} 원
        </span>
      </div>
    </Link>
  );
}
