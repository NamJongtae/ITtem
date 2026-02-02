"use client";

import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { useSearchParams } from "next/navigation";

const MAX = CATEGORY.length - 1;

function normalizeCategoryId(raw: string | null) {
  const id = Number(raw);
  return Number.isInteger(id) && id >= 0 && id <= MAX ? id : 0;
}

export default function useSerachCategory() {
  const searchParams = useSearchParams();

  const currentCategoryId = normalizeCategoryId(
    searchParams.get("category_id")
  );
  const currentCategory = (CATEGORY[currentCategoryId] ??
    "전체") as ProductCategory;
  const keyword = searchParams.get("keyword") ?? "";

  const makeHref = (nextId: number) => {
    const safeNextId = normalizeCategoryId(String(nextId));
    const params = new URLSearchParams(searchParams.toString());

    params.set("category_id", String(safeNextId));

    if (keyword) params.set("keyword", keyword);
    else params.delete("keyword");

    return `/product/search?${params.toString()}`;
  };

  return { currentCategoryId, currentCategory, keyword, makeHref };
}
