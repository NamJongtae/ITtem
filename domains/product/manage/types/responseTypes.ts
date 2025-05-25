import { ApiResponse } from "@/shared/common/types/responseTypes";
import {
  ProductReviewData,
  PurchaseTradingData,
  SaleTradingData
} from "./productManageTypes";

export interface SalesTradingResponseData extends ApiResponse {
  saleTrading: SaleTradingData[];
}

export interface PurchaseTradingResponseData extends ApiResponse {
  purchaseTrading: PurchaseTradingData[];
}

export interface ProductReviewResponseData extends ApiResponse {
  review: ProductReviewData;
}
