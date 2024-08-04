import { useRef, useState } from "react";
import { RecentProductData } from "@/types/productTypes";

export default function useRecentProductSlider() {
  const [page, setPage] = useState(0);
  const sliderRef = useRef<HTMLUListElement>(null);
  const rencentProduct: RecentProductData[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("recentProduct") || "[]")
      : [];

  const max = rencentProduct.length || 1;

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
    rencentProduct,
    page,
    max,
    handleClickNext,
    handleClickPrev,
    sliderRef,
  };
}
