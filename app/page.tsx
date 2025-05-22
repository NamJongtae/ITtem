import HomeBanner from "@/domains/home/components/hom-banner";
import { Metadata } from "next";
import PopularProduct from "@/domains/home/components/popular-product";
import RecommendProduct from "@/domains/home/components/recommend-product";

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
      <PopularProduct />
      <RecommendProduct />
    </>
  );
}
