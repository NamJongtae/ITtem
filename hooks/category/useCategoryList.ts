import { usePathname, useSearchParams } from "next/navigation";

export default function useCategoryList() {
  const pathname = usePathname();
  const search = useSearchParams();
  const keyword = search.get("keyword");

  return { pathname, keyword };
}
