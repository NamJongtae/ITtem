import ProductListItem from "@/domains/product/shared/components/product-list/ProductListItem";
import {
  ProductCategory,
  type ProductData
} from "@/domains/product/shared/types/productTypes";
import Empty from "@/shared/common/components/Empty";

export default function RecommendProductFirstList({
  products
}: {
  products: ProductData[];
}) {
  return (
    <div className="max-w-[1024px] mx-auto px-8 mt-6">
      {products.length === 0 ? (
        <Empty message="오늘의 추천 상품이 없어요." />
      ) : (
        <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <li key={item._id}>
              <ProductListItem data={item} category={ProductCategory.전체} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
