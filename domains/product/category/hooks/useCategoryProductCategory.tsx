"use client";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { useParams } from "next/navigation";

const MAX = CATEGORY.length - 1;

function normalize(raw?: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id >= 0 && id <= MAX ? id : 0;
}

export function useCategoryProductCategory() {
  const params = useParams<{ categoryId?: string }>();
  const currentCategoryId = normalize(params?.categoryId);
  return {
    currentCategoryId,
    currentCategory: CATEGORY[currentCategoryId] ?? "전체"
  };
}
