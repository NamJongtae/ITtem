import { useRouter } from "next/router";
import { useRef } from "react";

export default function useProductManageSearch() {
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

  return { formRef, onSubmitSearch, searchParams };
}
