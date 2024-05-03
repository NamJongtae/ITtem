import { ProductListType } from "@/types/productTypes";
import Empty from "../Empty";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

interface IProps {
  productListType: ProductListType;
  error: AxiosError<unknown, any>;
}

export default function ProductListError({ productListType, error }: IProps) {
  const search = useSearchParams();
  const keyword = search.get("keyword");

  return error.response?.status === 404 ? (
    <Empty
      message={`${
        productListType === "TODAY"
          ? "오늘의 상품이 존재하지 않아요."
          : productListType === "CATEGORY"
          ? "상품이 존재하지 않아요."
          : `${'"' + keyword + '"'}에 대한 검색결과가 없어요.`
      }`}
    />
  ) : (
    <Empty
      message={`${
        productListType === "TODAY"
          ? "오늘의 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
          : productListType === "CATEGORY"
          ? "상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
          : "검색 결과를 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
      }`}
    />
  );
}
