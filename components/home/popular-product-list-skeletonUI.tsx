"use client";

import useSliderSkeletonUILogic from "@/hooks/home/useSliderSkeletonUILogic";

export default function PopularProductListSkeletonUI() {
  const { gap, slidesToShow } = useSliderSkeletonUILogic();

  return (
    <div
      className="flex w-full h-[340px] justify-center animate-pulse overflow-hidden"
      style={{ gap: `${gap}px` }}
    >
      {[...Array(slidesToShow)].map((_, i) => (
        <div key={i} className="w-full h-full max-w-xs bg-gray-200" />
      ))}
    </div>
  );
}
