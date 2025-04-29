import Image from "next/image";
import { Suspense } from "react";
import Spinner from "../commons/spinner";
import RecommendProductList from "./recommend-product-list";

export default function RecommendProduct() {
  return (
    <section>
      <h2 className="flex justify-center items-center font-semibold text-xl sm:text-2xl mt-20 mb-5 gap-2">
        <Image src={"/icons/star.svg"} alt="" width={29} height={28} /> 오늘의
        추천 상품
      </h2>

      <p className="text-sm sm:text-base text-center mb-5">
        원하는 상품이 있는지 확인해보세요.
      </p>

      <Suspense
        fallback={
          <div className="flex max-w-[1024px] mx-auto pt-32 justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <RecommendProductList />
      </Suspense>
    </section>
  );
}
