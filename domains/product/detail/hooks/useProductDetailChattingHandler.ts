import useStartChatMutate from "@/domains/chat/room-list/hooks/mutations/useStartChatMutate";
import { ProductStatus } from "../../shared/types/productTypes";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

interface IParams {
  productStatus: ProductStatus | undefined;
  productId: string | undefined;
  productUserId: string | undefined;
}

export default function useProductDetailChattingHandler({
  productStatus,
  productId,
  productUserId
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
    if (!productId || !productUserId) return;

    mutate({ productId, userId: productUserId });
  };

  return { handleClickChatting };
}
