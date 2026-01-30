import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { useParams } from "next/navigation";

export default function useCurrentCategory() {
  const params = useParams<{ categoryId?: string }>();
  const raw = params?.categoryId;

  // ✅ 숫자 id 파싱 (없거나 잘못되면 0 = "전체")
  const id = Number(raw);
  const currentCategoryId =
    Number.isInteger(id) && id >= 0 && id <= 13 ? id : 0;

  const currentCategory = CATEGORY[currentCategoryId] ?? "전체";

  return { currentCategoryId, currentCategory };
}
