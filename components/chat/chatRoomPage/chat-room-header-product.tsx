import useProductQuery from "@/hooks/reactQuery/mutations/product/useProductQuery";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  productId: string;
}

export default function ChatRoomHeaderProduct({ productId }: IProps) {
  const { productDetailData, loadProductLoading } = useProductQuery(
    false,
    productId
  );

  if (!productDetailData || loadProductLoading) {
    return (
      <div className="rounded-full w-10 h-10">
        <span className="sr-only">loading</span>
      </div>
    );
  }
  return (
    <Link className="flex gap-2" href={`/product/${productDetailData._id}`}>
      <Image
        className="rounded-full w-10 h-10 object-cover object-center"
        src={productDetailData?.imgData[0].url || ""}
        alt={productDetailData?.name || ""}
        width={40}
        height={40}
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm line-clamp-1">
            {productDetailData?.name}
          </span>
        </div>
        <span className="block text-xs font-semibold text-gray-400">
          {productDetailData?.price} 원
        </span>
      </div>
    </Link>
  );
}
