import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";

export default function HomeLoading() {
  return (
    <div className="max-w-[1024px] w-full h-full mx-auto px-8 animate-pulse">
      {/* 배너 */}
      <div className="w-full h-ful bg-gray-200 aspect-[256/75]" />

      {/* 인기 상품 */}
      <div className="w-28 h-[32px] mx-auto bg-gray-200 mt-8 mb-5" />
      <div className="w-full max-w-72 h-5 mx-auto bg-gray-200 mb-5" />
      <div className="flex gap-[30px] h-[340px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-1 w-full h-full bg-gray-200" />
        ))}
      </div>

      {/* 추천 상품 */}
      <div className="w-28 h-[32px] mx-auto bg-gray-200 mt-8 mb-5" />
      <div className="w-full max-w-72 h-5 mx-auto bg-gray-200 mb-5" />
      <ul className="grid gap-5 grid-cols-autoFill mt-6">
        <ProductListSkeletonUI listCount={12} />
      </ul>
    </div>
  );
}
