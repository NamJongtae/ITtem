import SearchCategoryMenu from "./SearchCategoryMenu";
import SearchCategoryNav from "./SearchCategoryNav";

export default function SearchHeader() {
  return (
    <div className="container flex flex-col gap-5 items-center mx-auto px-8 mt-8 max-w-[1024px]">
      <h2 className="sr-only">검색결과</h2>

      <div className="flex gap-5 justify-between w-full items-center">
        <SearchCategoryNav />
      </div>
      <SearchCategoryMenu />
    </div>
  );
}
