import { useRef } from "react";

export function useSearchForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const getSearchValue = () => {
    if (!formRef.current) return "";
    const formData = new FormData(formRef.current);
    return (formData.get("search") || "") as string;
  };

  return { formRef, getSearchValue };
}
