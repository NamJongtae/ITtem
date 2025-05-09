import { useRef } from "react";
import { useGetQuerys } from "../commons/useGetQuerys";
import { useCustomRouter } from "../commons/useCustomRouter";

export default function useProductManageSearch() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { navigate } = useCustomRouter();
  const { search, status } = useGetQuerys(["search", "status"]);

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const searchValue = String(formData.get("search") || "").trim();

    const params = new URLSearchParams();
    if (searchValue) params.set("search", searchValue);
    if (status) params.set("status", status);

    const newUrl = `/product/manage${params.toString() ? `?${params}` : ""}`;
    navigate({ type: "push", url: newUrl });
  };

  return { formRef, onSubmitSearch, search };
}
