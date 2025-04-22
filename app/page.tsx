import HomeBanner from "@/components/home/hom-banner";
import TodayProduct from "@/components/home/today-product";
import { Metadata } from "next";
import { Suspense } from "react";
import Spinner from "@/components/commons/spinner";

export const metadata: Metadata = {
  title: "ITtem | 홈",
  openGraph: {
    title: "ITtem | 홈"
  }
};

export default async function Home() {
  return (
    <>
      <h2 className="sr-only">홈 페이지</h2>
      <HomeBanner />
      <section>
        <h2 className="font-semibold text-xl sm:text-2xl text-center mt-8 mb-10">
          오늘의 상품
        </h2>
        <Suspense
          fallback={
            <div className="flex max-w-[1024px] mx-auto pt-32 justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <TodayProduct />
        </Suspense>
      </section>
    </>
  );
}
