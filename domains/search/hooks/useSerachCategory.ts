import { useSearchParams } from "next/navigation";

export default function useSerachCategory() {
  const searchParams = useSearchParams();

  const currentCategoryId = Number(searchParams.get("category_id") ?? "0");
  const keyword = searchParams.get("keyword") ?? "";

  const makeHref = (nextId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", String(nextId));
    if (keyword) params.set("keyword", keyword);
    else params.delete("keyword");
    return `/product/search?${params.toString()}`;
  };

  return { currentCategoryId, makeHref };
}
