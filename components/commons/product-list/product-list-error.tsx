import { ProductListType } from "@/types/product-types";
import Empty from "../empty";

interface IProps {
  productListType: ProductListType;
}

const getMessage = (productListType: ProductListType) => {
  switch (productListType) {
    case "RECOMMEND":
      return "오늘의 추천 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요.";
    case "POPULAR":
      return "인기 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요.";
    case "CATEGORY":
    case "PROFILE":
      return "상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요.";
    case "SEARCH":
      return "검색 결과를 불러올 수 없어요.\n잠시 후 다시 시도해주세요.";
    default:
      return "상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요.";
  }
};

export default function ProductListError({ productListType }: IProps) {
  return <Empty message={getMessage(productListType)} />;
}
