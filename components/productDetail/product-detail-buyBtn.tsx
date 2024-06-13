import usePurchaseProductMutate from "@/hooks/reactQuery/mutations/trade/usePurchaseProductMutate";
import BuyIcon from "@/public/icons/money_icon.svg";
import { ProductStatus } from "@/types/productTypes";
import { toast } from "react-toastify";

interface IProps {
  productStatus: ProductStatus | undefined;
}
export default function ProductDetailBuyBtn({ productStatus }: IProps) {
  const { purchaseProductMutate } = usePurchaseProductMutate();
  const handleClickPurchase = () => {
    if (productStatus === "trading") {
      toast.warn("이미 거래중인 상품이에요.");
      return;
    }
    if (productStatus === "soldout") {
      toast.warn("이미 판매된 상품이에요.");
      return;
    }
    const isPurchase = confirm("정말 구매하시겠어요?");
    if (isPurchase) {
      purchaseProductMutate();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClickPurchase}
      className="px-4 py-2 flex items-center gap-2 bg-red-600 text-white text-sm font-medium rounded hover:betterhover:bg-red-500 focus:outline-none focus:bg-red-500 md:px-6"
    >
      <BuyIcon className={"fill-white w-4 h-4"} /> 구매요청
    </button>
  );
}
