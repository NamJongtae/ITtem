import { ApiResponse } from "@/types/response-types";
import {
  ProductData,
  ProductDetailData,
  PurchaseTradingData,
  SaleTradingData
} from "./product-types";

export interface PurchaseProductResponseData extends ApiResponse {
  message: string;
}

export interface DeleteProductResponseData extends ApiResponse {
  message: string;
}
export interface IncrementProductViewResponseData extends ApiResponse {
  viewCount: number;
}

export interface ReportProductResponseData extends ApiResponse {
  message: string;
}

export interface ProductListResponseData extends ApiResponse {
  products: ProductData[];
}

export interface ProductResponseData extends ApiResponse {
  product: ProductData;
}

export interface ProductDetailResponseData extends ApiResponse {
  product: ProductDetailData;
}

export interface AddProductWishResponseData extends ApiResponse {
  message: string;
}

export interface DeleteProductWishResponseData extends ApiResponse {
  message: string;
}

export interface UploadProductReviewResponseData extends ApiResponse {
  message: string;
}

export interface SalesTradingResponseData extends ApiResponse {
  saleTrading: SaleTradingData[];
}

export interface PurchaseTradingResponseData extends ApiResponse {
  purchaseTrading: PurchaseTradingData[];
}

export interface WishlistProductData extends ApiResponse {
  products: ProductData[];
}

export interface DeleteProfileWishesResponseData extends ApiResponse {
  wishProductIds: string[];
}
