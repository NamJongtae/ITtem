import useProductDetailBuyBtn from "@/hooks/product-detail/useProductDetailBuyBtn";
import BuyIcon from "@/public/icons/money-icon.svg";
import { ProductStatus } from "@/types/product-types";

interface IProps {
  productStatus: ProductStatus | undefined;
}
export default function ProductDetailBuyBtn({ productStatus }: IProps) {
  const { handleClickPurchase } = useProductDetailBuyBtn({ productStatus });

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
