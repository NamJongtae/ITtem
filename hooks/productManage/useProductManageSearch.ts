import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function useProductManageSearch() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const searchValue = formData.get("search");

    const newUrl = `/product/manage${
      status
        ? searchValue
          ? `?search=${searchValue}&status=${status}`
          : `?status=${status}`
        : searchValue
        ? `?search=${searchValue}`
        : ""
    }`;
    router.push(newUrl);
  };

  return { formRef, onSubmitSearch, search };
}
