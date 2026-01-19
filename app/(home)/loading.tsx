import PopularProductListSkeletonUI from "@/domains/home/components/PopularProductListSkeletonUI";
import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";
import Image from "next/image";

export default function HomeLoading() {
  return (
    <>
      <div className="relative mx-auto max-w-[1024px] px-8 w-full h-auto animate-pulse">
        {/* 베너 */}
        <div className="w-full h-full bg-gray-200 object-cover object-center aspect-[256/75]" />

        {/* 인기 상품 */}
        <div className="flex justify-center items-center font-semibold text-xl sm:text-2xl mt-8 mb-5 gap-2">
          <Image src={"/icons/fire.svg"} alt="" width={21} height={28} /> 인기
          상품
        </div>

        <div className="text-sm sm:text-base text-center mb-5">
          언제 팔릴 지 모르는 조회수가 가장 높은 <strong>인기상품</strong>
        </div>

        <PopularProductListSkeletonUI />
      </div>
      
      <div className="relative mx-auto max-w-[1024px] w-full h-auto animate-pulse">
        {/* 추천 상품 */}
        <div className="flex justify-center items-center font-semibold text-xl sm:text-2xl mt-20 mb-5 gap-2">
          <Image src={"/icons/star.svg"} alt="" width={29} height={29} /> 오늘의
          추천 상품
        </div>

        <div className="text-sm sm:text-base text-center mb-5">
          원하는 상품이 있는지 확인해보세요.
        </div>

        <ProductListSkeletonUI listCount={10} />
      </div>
    </>
  );
}
