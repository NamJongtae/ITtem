import useAuthStore from "@/domains/auth/store/auth-store";
import { ProductStatus } from "../../types/product-types";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

interface IParams {
  productStatus: ProductStatus | undefined;
}

export default function useProductDetailEditHandler({
  productStatus
}: IParams) {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;
  const user = useAuthStore((state) => state.user);
  const handleClickEdit = () => {
    if (productStatus === "trading") {
      toast.warn("거래중인 상품은 수정할 수 없어요.");
      return;
    }
    if (productStatus === "soldout") {
      toast.warn("판매된 상품은 수정할 수 없어요.");
      return;
    }
    if (!user) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    router.push(`/product/${productId}/edit`);
  };

  return { handleClickEdit };
}
