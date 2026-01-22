"use client";

import "swiper/css";
import usePopularProductQuery from "@/domains/product/shared/hooks/queries/usePopularProductQuery";
import dynamic from "next/dynamic";
import PopularProductListSkeletonUI from "./PopularProductListSkeletonUI";

const PopularProductSwiper = dynamic(() => import("./PopularProductSwiper"), {
  ssr: false,
  loading: () => <PopularProductListSkeletonUI />
});

export default function PopularProductSlider() {
  const { data } = usePopularProductQuery();

  return <PopularProductSwiper data={data} />;
}
