import Spinner from "@/components/commons/spinner";
import useProductQuery from "@/hooks/querys/useProductQuery";
import Image from "next/image";

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
    <>
      <Image
        className="rounded-full w-10 h-10 bg-center"
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
    </>
  );
}
