import { ApiResponse } from "@/shared/common/types/responseTypes";
import { ProductDetailData } from "./productDetailTypes";

export interface ProductDetailResponseData extends ApiResponse {
  product: ProductDetailData;
}

export interface IncrementProductViewResponseData extends ApiResponse {
  viewCount: number;
}
