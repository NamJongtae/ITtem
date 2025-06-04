import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useNavSearchBar() {
  const router = useRouter();
  const search = useSearchParams();
  const keyword = search.get("keyword") || "";

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { keyword }
  });

  useEffect(() => {
    reset({ keyword: keyword });
  }, [keyword, reset]);

  const submitHandler = (values: FieldValues) => {
    const keyword = values.keyword;
    if (!keyword) {
      toast.warn("검색어를 입력해주세요.");
      return;
    }
    router.push(`/search/product?keyword=${keyword}`);
  };

  const onSubmit = handleSubmit(submitHandler);

  return { register, onSubmit, submitHandler };
}
