"use client";

import useRecentProductSlider from "@/hooks/commons/layout/useRecentProductSlider";
import { RecentProductData } from "@/types/product-types";
import RecentProductSliderBtn from "./recent-product-slider-btn";
import RecentProductSliderItem from "./recent-product-slider-item";

export default function RecentProductSlider() {
  const {
    rencentProduct,
    page,
    max,
    handleClickNext,
    handleClickPrev,
    sliderRef,
  } = useRecentProductSlider();

  return (
    <div className="mt-2 w-[100px] overflow-hidden">
      <ul
        className="flex gap-2 transition-all duration-200 min-h-[100px]"
        ref={sliderRef}
      >
        {rencentProduct.map((recentProductData: RecentProductData) => {
          return (
            <RecentProductSliderItem
              key={recentProductData.productId}
              recentProductData={recentProductData}
            />
          );
        })}
      </ul>
      <RecentProductSliderBtn
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        page={page}
        max={max}
      />
    </div>
  );
}
