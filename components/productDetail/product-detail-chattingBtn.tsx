import ChatIcon from "@/public/icons/chat_icon.svg";
import { ProductStatus } from "@/types/productTypes";
import useProductDetailChattingBtn from "@/hooks/productDetail/useProductDetailChattingBtn";

interface IProps {
  productStatus: ProductStatus | undefined;
  productId: string | undefined;
  userId: string | undefined;
}

export default function ProductDetailChattingBtn({
  productStatus,
  productId,
  userId,
}: IProps) {
  const { handleClickChatting } = useProductDetailChattingBtn({
    productStatus,
    productId,
    userId,
  });

  return (
    <button
      type="button"
      onClick={handleClickChatting}
      className="px-4 py-2 flex items-center gap-2 bg-yellow-500 text-white text-sm font-medium rounded hover:betterhover:bg-yellow-400 focus:outline-none focus:bg-yellow-500"
    >
      <ChatIcon className={"fill-white w-4 h-4"} /> 채팅하기
    </button>
  );
}
