import { ProfileMenu } from "../../../types/profileTypes";

interface IProps {
  productCount: number;
  reviewPercentage: number;
  saleCount: number;
  handleClickMenu: (menu: ProfileMenu) => void;
}

export default function ProductInfo({
  productCount,
  reviewPercentage,
  saleCount,
  handleClickMenu
}: IProps) {
  return (
    <>
      <div className="text-sm font-medium">
        <button
          onClick={() => handleClickMenu("products")}
          className="relative mr-4 before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2"
        >
          상품 {productCount || 0}
        </button>

        <button onClick={() => handleClickMenu("reviews")}>
          평가 {reviewPercentage === 0 ? `${reviewPercentage}%` : "없음"}
        </button>
      </div>
      <span className="text-sm">상품판매 {saleCount || 0}회</span>
    </>
  );
}
