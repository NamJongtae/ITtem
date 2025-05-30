import { useRef, useState } from "react";
import { RecentProductData } from "../types/layoutTypes";

export default function useRecentProductSlider(
  recentProduct: RecentProductData[]
) {
  const [page, setPage] = useState(0);
  const sliderRef = useRef<HTMLUListElement>(null);

  const max = recentProduct?.length || 1;

  const handleClickNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(-${(page + 1) * 108}px)`;
    setPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(-${(page - 1) * 108}px)`;
    setPage((prevPage) => prevPage - 1);
  };

  return {
    page,
    max,
    handleClickNext,
    handleClickPrev,
    sliderRef
  };
}
