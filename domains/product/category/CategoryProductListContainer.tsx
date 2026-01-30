import { ProductCategory } from "../shared/types/productTypes";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProductListSkeletonUI from "../shared/components/product-list/ProductListSkeletonUI";
import ProductListError from "../shared/components/product-list/ProductListError";
import { getCategoryProductsServer } from "../server/getCategoryProductsServer";
import CategoryProductFirstList from "./CategoryFirstList";
import CategoryProductListClient from "./CategoryProductListClient";

interface IProps {
  category: ProductCategory;
}

export default async function CategoryProductListContainer({
  category
}: IProps) {
  const { products, nextCursor } = await getCategoryProductsServer({
    category,
    limit: 12
  });

  return (
    <SuspenseErrorBoundary
      suspenseFallback={<ProductListSkeletonUI listCount={12} />}
      errorFallback={<ProductListError productListType="CATEGORY" />}
    >
      <CategoryProductFirstList products={products} category={category} />
      <CategoryProductListClient category={category} nextCursor={nextCursor} />
    </SuspenseErrorBoundary>
  );
}
