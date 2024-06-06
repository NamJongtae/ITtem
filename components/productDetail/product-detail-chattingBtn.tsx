import { RootState } from "@/store/store";
import ChatIcon from "@/public/icons/chat_icon.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ProductStatus } from "@/types/productTypes";
import useStartChatMutate from "@/hooks/querys/useStartChatMutate";

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
  const { mutate } = useStartChatMutate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleClickChatting = () => {
    if (productStatus === "trading") {
      toast.warn("현재 거래중인 상품이에요.");
      return;
    }
    if (productStatus === "soldout") {
      toast.warn("이미 판매된 상품이에요.");
      return;
    }
    if (!user) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    if (!productId || !userId) return;

    mutate({ productId, userId });
  };

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
