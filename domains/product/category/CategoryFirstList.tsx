import Empty from "@/shared/common/components/Empty";
import ProductListItem from "../shared/components/product-list/ProductListItem";
import { ProductCategory, ProductData } from "../shared/types/productTypes";

export default function CategoryProductFirstList({
  products,
  category
}: {
  products: ProductData[];
  category: ProductCategory;
}) {

  return (
    <div className="max-w-[1024px] mx-auto px-8 mt-6">
      {products.length === 0 ? (
        <Empty message="상품이 존재하지 않아요." />
      ) : (
        <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <li key={item._id}>
              <ProductListItem data={item} category={category} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
