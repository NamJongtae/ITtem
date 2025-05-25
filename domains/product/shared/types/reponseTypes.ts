import { ApiResponse } from "@/shared/common/types/responseTypes";
import { ProductData } from "./productTypes";

export interface ProductListResponseData extends ApiResponse {
  products: ProductData[];
}

export interface ProductResponseData extends ApiResponse {
  product: ProductData;
}

export interface UploadProductReviewResponseData extends ApiResponse {
  message: string;
}
