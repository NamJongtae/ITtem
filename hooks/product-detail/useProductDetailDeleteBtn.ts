import useProductDeleteMutate from "../react-query/mutations/product/useProducDeletetMutate";
import { ProductStatus } from "@/types/product-types";
import { toast } from "react-toastify";
import useAuthStore from "@/store/auth-store";

interface IParams {
  productStatus: ProductStatus | undefined;
}

export default function useProductDetailDeleteBtn({ productStatus }: IParams) {
  const { productDeleteMutate, productDeleteLoading } =
    useProductDeleteMutate();
  const user = useAuthStore((state) => state.user);
  const handleClickDelete = () => {
    if (productStatus === "trading") {
      toast.warn("거래중인 상품은 삭제할 수 없어요.");
      return;
    }
    if (productStatus === "soldout") {
      toast.warn("판매된 상품은 삭제할 수 없어요.");
      return;
    }
    if (!user) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    const isDelete = confirm("정말 삭제하겠습니까?");
    if (isDelete) {
      productDeleteMutate();
    }
  };

  return { productDeleteLoading, handleClickDelete };
}
