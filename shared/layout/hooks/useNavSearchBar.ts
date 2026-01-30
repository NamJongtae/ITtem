import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useNavSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { category_id, keyword } = useGetQuerys(["category_id", "keyword"]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { keyword }
  });

  useEffect(() => {
    reset({ keyword: keyword });
  }, [keyword, reset]);

  useEffect(() => {
    const isSearchPage = pathname.startsWith("/search");
    if (isSearchPage) reset({ keyword: keyword ?? "" });
    else reset({ keyword: "" });
  }, [pathname, keyword, reset]);

  const submitHandler = (values: FieldValues) => {
    const keyword = values.keyword;
    if (!keyword) {
      toast.warn("검색어를 입력해주세요.");
      return;
    }
    router.push(
      `/search?keyword=${keyword}${category_id ? `&category_id=${category_id}` : ""}`
    );
  };

  const onSubmit = handleSubmit(submitHandler);

  return { register, onSubmit, submitHandler };
}
