import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function NavSearchBar() {
  const router = useRouter();
  const search = useSearchParams();
  const keyword = search.get("keyword") || "";

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { keyword },
  });

  useEffect(() => {
    reset({ keyword: keyword });
  }, [keyword, reset]);

  const onSubmit = (values: FieldValues) => {
    const keyword = values.keyword;
    if (!keyword) {
      toast.warn("검색어를 입력해주세요.");
      return;
    }
    router.push(`/search/product?keyword=${keyword}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full max-w-[200px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] ml-auto mr-5 md:ml-0 md:mr-0 bg-black"
    >
      <button
        type="submit"
        className="absolute inset-y-0 right-3 flex items-center"
      >
        <Image src="/icons/search_icon.svg" alt="검색" width={20} height={20} />
      </button>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="keyword"
        className="w-full pl-3 pr-10 py-2 border-2 border-gray-700 leading-5 bg-white text-gray-900 placeholder-gray-400 sm:text-sm"
        placeholder="상품명, 지역명 검색"
        {...register("keyword")}
      />
    </form>
  );
}
