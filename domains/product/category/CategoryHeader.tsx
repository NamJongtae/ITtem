import LocationCheckbox from "../upload/components/ProductLocationCheckbox";
import ProductCategoryMenu from "./ProductCategoryMenu";
import CategoryProductNav from "./CategoryProductNav";

export default function CategoryHeader() {
  return (
    <div className="container flex flex-col gap-5 items-center mx-auto px-8 mt-8 max-w-[1024px]">
      <h2 className="sr-only">중고거래</h2>

      <div className="flex gap-5 justify-between w-full items-center">
        <CategoryProductNav />
        <LocationCheckbox />
      </div>
      <ProductCategoryMenu />
    </div>
  );
}
