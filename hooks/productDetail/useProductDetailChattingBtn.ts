import { useSelector } from "react-redux";
import useStartChatMutate from "../reactQuery/mutations/chat/useStartChatMutate";
import { RootState } from "@/store/store";
import { ProductStatus } from "@/types/productTypes";
import { toast } from "react-toastify";

interface IPrarsm {
  productStatus: ProductStatus | undefined;
  productId: string | undefined;
  userId: string | undefined;
}

export default function useProductDetailChattingBtn({
  productStatus,
  productId,
  userId,
}: IPrarsm) {
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

  return { handleClickChatting };
}
