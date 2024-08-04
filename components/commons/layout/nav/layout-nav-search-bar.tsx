"use client";

import useNavSearchBar from "@/hooks/commons/layout/useNavSearchBar";
import Image from "next/image";

export default function LayoutNavSearchBar() {
  const { register, onSubmit } = useNavSearchBar();

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-[200px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] ml-auto mr-5 md:ml-0 md:mr-0 flex"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        className="w-full pl-3 pr-10 py-2 border-2 border-gray-700 leading-5 bg-white text-gray-900 placeholder-gray-400 sm:text-sm"
        placeholder="상품명, 지역명 검색"
        {...register("keyword")}
      />
      <button
        type="submit"
        className="absolute inline-flex justify-center items-center right-0 w-10 h-10"
      >
        <Image src="/icons/search-icon.svg" alt="검색" width={20} height={20} />
      </button>
    </form>
  );
}
