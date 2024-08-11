import usePurchaseProductMutate from "../react-query/mutations/product/usePurchaseProductMutate";
import { ProductStatus } from "@/types/product-types";
import { toast } from "react-toastify";
import useAuthStore from "@/store/auth-store";

interface IParams {
  productStatus: ProductStatus | undefined;
}

export default function useProductDetailBuyBtn({ productStatus }: IParams) {
  const { purchaseProductMutate } = usePurchaseProductMutate();
  const user = useAuthStore((state) => state.user);

  const handleClickPurchase = () => {
    if (productStatus === "trading") {
      toast.warn("이미 거래중인 상품이에요.");
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
    const isPurchase = confirm("정말 구매하시겠어요?");
    if (isPurchase) {
      purchaseProductMutate();
    }
  };

  return { handleClickPurchase };
}
