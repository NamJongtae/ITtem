import Image from "next/image";
import { Suspense } from "react";
import PopularProductListSkeletonUI from "./PopularProductListSkeletonUI";
import PopularProductSliderContainer from "./PopularProductSliderContainer";

export default function PopularProduct() {
  return (
    <section className="max-w-[1024px] mx-auto px-8">
      <h2 className="flex justify-center items-center font-semibold text-xl sm:text-2xl mt-8 mb-5 gap-2">
        <Image src={"/icons/fire.svg"} alt="" width={21} height={28} /> 인기
        상품
      </h2>

      <p className="text-sm sm:text-base text-center mb-5">
        언제 팔릴 지 모르는 조회수가 가장 높은 <strong>인기상품</strong>
      </p>

      <Suspense fallback={<PopularProductListSkeletonUI />}>
        <PopularProductSliderContainer />
      </Suspense>
    </section>
  );
}
