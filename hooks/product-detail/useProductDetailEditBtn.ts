import { RootState } from "@/store";
import { ProductStatus } from "@/types/productTypes";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IParams {
  productStatus: ProductStatus | undefined;
}

export default function useProductDetailEditBtn({ productStatus }: IParams) {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;
  const user = useSelector((state: RootState) => state.auth.user);
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
