import ProductListItem from "@/domains/product/shared/components/product-list/ProductListItem";
import {
  ProductCategory,
  type ProductData
} from "@/domains/product/shared/types/productTypes";

export default function RecommendProductFirstList({
  products
}: {
  products: ProductData[];
}) {
  return (
    <div className="max-w-[1024px] mx-auto px-8 mt-6">
      <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <ProductListItem
            key={item._id}
            data={item}
            category={ProductCategory.전체}
          />
        ))}
      </ul>
    </div>
  );
}
