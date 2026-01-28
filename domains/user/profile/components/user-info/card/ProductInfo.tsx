interface IProps {
  productCount: number;
  reviewPercentage: number;
  saleCount: number;
}

export default function ProductInfo({
  productCount,
  reviewPercentage,
  saleCount
}: IProps) {
  return (
    <>
      <div className="flex text-sm font-medium">
        <p className="relative mr-4 before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
          상품 {productCount || 0}
        </p>

        <p>평가 {reviewPercentage === 0 ? `${reviewPercentage}%` : "없음"}</p>
      </div>
      <span className="text-sm">상품판매 {saleCount || 0}회</span>
    </>
  );
}
