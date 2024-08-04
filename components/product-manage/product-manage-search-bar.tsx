import useProductManageSearch from "@/hooks/product-manage/useProductManageSearch";
import Image from "next/image";

export default function ProductManageSearchBar() {
  const { formRef, onSubmitSearch, search } = useProductManageSearch();
  return (
    <form
      className="relative w-full max-w-[330px]"
      ref={formRef}
      onSubmit={onSubmitSearch}
    >
      <label className="sr-only" id="search">
        검색
      </label>
      <input
        className="border border-gray-400 py-2 pl-4 pr-8 w-full"
        placeholder="상품명"
        name={"search"}
        defaultValue={search}
        id="search"
      />
      <button
        type="submit"
        className="absolute inline-flex items-center justify-center right-0 w-10 h-10"
      >
        <Image
          src={"/icons/search-icon.svg"}
          alt="검색"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
}
