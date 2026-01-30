import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { useSearchParams } from "next/navigation";

const MAX = CATEGORY.length - 1;

function normalize(raw: string | null) {
  const id = Number(raw);
  return Number.isInteger(id) && id >= 0 && id <= MAX ? id : 0;
}

export function useProductDetailCategory() {
  const sp = useSearchParams();
  const currentCategoryId = normalize(sp.get("category_id"));
  return {
    currentCategoryId,
    currentCategory: CATEGORY[currentCategoryId] ?? "전체"
  };
}
