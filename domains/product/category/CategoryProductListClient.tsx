"use client";

import dynamic from "next/dynamic";
import { ProductCategory } from "../shared/types/productTypes";

interface IProps {
  category: ProductCategory;
  nextCursor: string | null;
}

const CategoryProductList = dynamic(() => import("./CategoryProductList"), {
  ssr: false
});

export default function CategoryProductListClient({
  category,
  nextCursor
}: IProps) {
  return <CategoryProductList category={category} nextCursor={nextCursor} />;
}
