import { CATEGORY } from "@/constants/constant";
import { useSearchParams } from "next/navigation";

export default function useCurrentCategory() {
  const search = useSearchParams();

  const currentCategory = CATEGORY.includes(search.get("category") || "")
    ? (search.get("category") as string)
    : "전체";

  return { currentCategory };
}
