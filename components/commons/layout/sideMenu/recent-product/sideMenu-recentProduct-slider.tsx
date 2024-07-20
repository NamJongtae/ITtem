"use client";

import useRecentProductSlider from "@/hooks/commons/layout/useRecentProductSlider";
import { RecentProductData } from "@/types/productTypes";
import SideMenuRecentProductSliderBtn from "./sideMenu-recentProduct-slider-btn";
import SideMenuRecentProductSliderItem from "./sideMenu-recentProduct-slider-item";

export default function SideMenuRecentProductSlider() {
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
            <SideMenuRecentProductSliderItem
              key={recentProductData.productId}
              recentProductData={recentProductData}
            />
          );
        })}
      </ul>
      <SideMenuRecentProductSliderBtn
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        page={page}
        max={max}
      />
    </div>
  );
}
