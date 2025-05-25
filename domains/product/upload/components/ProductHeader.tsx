import CategoryNav from "@/shared/category/components/CategoryNav";
import CategoryMenu from "@/shared/category/components/CategoryMenu";
import LocationCheckbox from "./ProductLocationCheckbox";

export default function ProductHeader() {
  return (
    <div className="container flex flex-col gap-5 items-center mx-auto px-8 mt-8 max-w-[1024px]">
      <h2 className="sr-only">중고거래</h2>

      <div className="flex gap-5 justify-between w-full items-center">
        <CategoryNav className="ml-2" />
        <LocationCheckbox />
      </div>
      <CategoryMenu />
    </div>
  );
}
