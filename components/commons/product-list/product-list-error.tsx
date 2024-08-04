import { ProductListType } from "@/types/productTypes";
import Empty from "../empty";

interface IProps {
  productListType: ProductListType;
}

export default function ProductListError({ productListType }: IProps) {
  return (
    <Empty
      message={`${
        productListType === "TODAY"
          ? "오늘의 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
          : productListType === "CATEGORY" || productListType === "PROFILE"
          ? "상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
          : "검색 결과를 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
      }`}
    />
  );
}
