import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";

interface IProps {
  isMyProfile?: boolean;
}

export default function ProfileDetailSkeletonUI({ isMyProfile }: IProps) {
  return (
    <div className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8 animate-pulse">
      {/* 메뉴 */}
      <div className="flex justify-between w-full h-full font-medium text-sm md:text-base">
        {[...Array(isMyProfile ? 5 : 4)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-12 border-b border-b-black pl-[1px]`}
          >
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>

      {/* 필터 네비게이션 */}
      <div className="w-full h-10 bg-gray-300 mt-5 mb-5" />
      <div className="w-full h-1 border-b mb-4" />

      {/* 상품 목록 */}
      <ProductListSkeletonUI listCount={8} />
    </div>
  );
}
