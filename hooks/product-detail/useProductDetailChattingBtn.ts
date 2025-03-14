import useStartChatMutate from "../react-query/mutations/chat/useStartChatMutate";
import { ProductStatus } from "@/types/product-types";
import { toast } from "react-toastify";
import useAuthStore from "@/store/auth-store";

interface IParams {
  productStatus: ProductStatus | undefined;
  productId: string | undefined;
  userId: string | undefined;
}

export default function useProductDetailChattingBtn({
  productStatus,
  productId,
  userId
}: IParams) {
  const { mutate } = useStartChatMutate();
  const user = useAuthStore((state) => state.user);

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

  return { handleClickChatting };
}
