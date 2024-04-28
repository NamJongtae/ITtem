import CategoryNav from "../commons/category/category-nav";
import CategoryMenu from "../commons/category/category-menu";

export default function ProductPageHeader() {
  return (
    <div className="container flex flex-col gap-5 items-center mx-auto px-8 mt-8 max-w-[1024px]">
      <h2 className="font-bold text-xl sm:text-2xl text-center">중고거래</h2>

      <div className="flex gap-5 justify-between w-full items-center">
        <CategoryNav className="ml-2" />
      </div>
      <CategoryMenu />
    </div>
  );
}
