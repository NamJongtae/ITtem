"use client";

import { useParams } from "next/navigation";
import CategoryMenuUI from "@/shared/category/components/CategoryMenuUI";

const clampCategoryId = (raw: string | undefined, max = 13) => {
  const id = Number(raw);
  return Number.isInteger(id) && id >= 0 && id <= max ? id : 0;
};

export default function ProductCategoryMenu() {
  const params = useParams<{ categoryId?: string }>();
  const currentCategoryId = clampCategoryId(params?.categoryId);

  return (
    <CategoryMenuUI
      currentCategoryId={currentCategoryId}
      makeHref={(id) => `/product/categories/${id}`}
    />
  );
}
