import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function ProductManageSearch() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const searchParams = router.query?.search || "";

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const searchValue = formData.get("search");
    const statusParams = router.query?.status;

    const newUrl = `/product/manage${
      statusParams
        ? searchValue
          ? `?search=${searchValue}&status=${statusParams}`
          : `?status=${statusParams}`
        : searchValue
        ? `?search=${searchValue}`
        : ""
    }`;
    router.push(newUrl);
  };

  return (
    <form className="relative w-full max-w-[330px]" ref={formRef} onSubmit={onSubmitSearch}>
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
