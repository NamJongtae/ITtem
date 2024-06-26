import useProductManageSearch from "@/hooks/productManage/useProductManageSearch";
import Image from "next/image";

export default function ProductManageSearch() {
  const { formRef, onSubmitSearch, searchParams } = useProductManageSearch();
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
        defaultValue={searchParams}
        id="search"
      />
      <button
        type="submit"
        className="absolute top-1/2 -translate-y-1/2 right-3"
      >
        <Image
          src={"/icons/search_icon.svg"}
          alt="검색"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
}
