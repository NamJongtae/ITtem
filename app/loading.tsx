import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";
import Image from "next/image";

export default function HomeLoading() {
  return (
    <div className="max-w-[1024px] w-full h-full mx-auto px-8">
      {/* 배너 */}
      <div className="w-full h-ful bg-gray-200 aspect-[256/75] animate-pulse" />

      {/* 인기 상품 */}
      <div className="flex justify-center items-center font-semibold text-xl sm:text-2xl mt-8 mb-5 gap-2">
        <Image src={"/icons/fire.svg"} alt="" width={21} height={28} /> 인기
        상품
      </div>
      <div className="text-center mb-5">
        언제 팔릴 지 모르는 조회수가 가장 높은 <strong>인기상품</strong>
        이에요.
      </div>
      <div className="flex gap-[30px] h-[340px] animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-1 w-full h-full bg-gray-200" />
        ))}
      </div>

      {/* 추천 상품 */}
      <div className="flex justify-center items-center font-semibold text-xl sm:text-2xl mt-20 mb-5 gap-2">
        <Image src={"/icons/star.svg"} alt="" width={29} height={28} /> 오늘의
        추천 상품
      </div>

      <div className="text-center">
        오늘의 <strong>추천 상품</strong>이에요.
      </div>
      <div className="text-center mb-5">원하는 상품이 있는지 확인해보세요.</div>
      <ul className="grid gap-5 grid-cols-autoFill mt-6">
        <ProductListSkeletonUI listCount={12} />
      </ul>
    </div>
  );
}
