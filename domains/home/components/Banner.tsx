"use client";

import dynamic from "next/dynamic";

const BannerSwiper = dynamic(() => import("./BannerSwiper"), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-gray-200 aspect-[256/75] animate-pulse" />
  )
});

export default function Banner() {
  return (
    <section className="relative mx-auto max-w-[1024px] px-8 w-full h-auto">
      <h2 className="sr-only">광고 배너</h2>
      <BannerSwiper />
    </section>
  );
}
