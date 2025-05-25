"use client";

import useRecentProductSlider from "@/shared/layout/hooks/useRecentProductSlider";
import { RecentProductData } from "@/shared/layout/types/layoutTypes";
import SliderBtn from "./SliderNavigationBtn";
import SliderItem from "./SliderItem";

export default function RecentProductSlider() {
  const {
    rencentProduct,
    page,
    max,
    handleClickNext,
    handleClickPrev,
    sliderRef
  } = useRecentProductSlider();

  return (
    <div className="mt-2 w-[100px] overflow-hidden">
      <ul
        className="flex gap-2 transition-all duration-200 min-h-[100px]"
        ref={sliderRef}
      >
        {rencentProduct.map((recentProductData: RecentProductData) => {
          return (
            <SliderItem
              key={recentProductData.productId}
              recentProductData={recentProductData}
            />
          );
        })}
      </ul>
      <SliderBtn
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        page={page}
        max={max}
      />
    </div>
  );
}
