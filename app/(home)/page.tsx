import Banner from "@/domains/home/components/Banner";
import { Metadata } from "next";
import PopularProduct from "@/domains/home/components/PopularProduct";
import RecommendProduct from "@/domains/home/components/RecommendProduct";

export const revalidate = 60;

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
      <Banner />
      <PopularProduct />
      <RecommendProduct />
    </>
  );
}
