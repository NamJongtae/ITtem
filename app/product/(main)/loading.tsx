import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";

export default function ProductLoading() {
  return (
    <>
      <div className="container flex flex-col gap-5 items-center mx-auto px-8 mt-8 max-w-[1024px]">
        {/* 헤더 */}
        <div className="flex gap-5 justify-between w-full items-center animate-pulse">
          <div className="w-[134px] h-6 bg-gray-200 rounded" />
          <div className="w-[92px] h-5 bg-gray-200 rounded" />
        </div>

        {/* 카테고리 메뉴 스켈레톤 */}
        <div className="container mx-auto max-w-7xl animate-pulse">
          {/* 데스크톱 메뉴 */}
          <div className="hidden sm:grid sm:grid-cols-5 my-6 gap-1">
            {Array.from({ length: 14 }).map((_, idx) => (
              <div key={idx} className="border bg-gray-200 h-[36px] rounded" />
            ))}
          </div>

           {/* 모바일 메뉴 */}
          <div className="flex justify-end sm:hidden px-3">
            <div className="w-[105px] h-[36px] bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <ProductListSkeletonUI />
    </>
  );
}
