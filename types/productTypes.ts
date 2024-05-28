import { ProfileData } from "./authTypes";

export enum ProductCategory {
  전체 = "전체",
  의류 = "의류",
  가방지갑 = "가방/지갑",
  신발 = "신발",
  시계 = "시계",
  스포츠 = "스포츠",
  악세사리 = "악세사리",
  악기음반 = "악기/음반",
  도서 = "도서",
  공구 = "공구",
  생활용품 = "생활용품",
  식품 = "식품",
  전자기기 = "전자기기",
}

export enum ProductCondition {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export enum ProductTransaction {
  직거래 = "직거래",
  택배 = "택배",
  모두 = "모두",
}

export enum ProductSellType {
  중고거래 = "중고거래",
  무료나눔 = "무료나눔",
}

export type ProductReturnPolicy = "가능" | "불가능";

export type ProductDeliveryFee = "포함" | "비포함";

export enum ProductStatus {
  soldout = "soldout",
  trading = "trading",
  sold = "sold",
}

export type ProductImgData = { url: string; name: string };

export interface ProductData {
  _id: string;
  name: string;
  description: string;
  uid: string;
  createdAt?: Date | string;
  status: ProductStatus;
  block: boolean;
  reportCount: number;
  reportUserIds: string[];
  wishCount: number;
  wishUserIds: string[];
  viewCount: number;
  imgData: ProductImgData[];
  price: number;
  location: string;
  sellType: ProductSellType;
  category: ProductCategory;
  condition: ProductCondition;
  returnPolicy: ProductReturnPolicy;
  transaction: ProductTransaction;
  deliveryFee: ProductDeliveryFee;
}

export interface ProductDetailAuthData {
  uid: string;
  nickname: string;
  profileImg: string;
  followers: string[];
  reviewPercentage: number;
  recentProducts: ProductData[];
}

export interface ProductDetailData extends ProductData {
  auth: ProductDetailAuthData;
}

export type ProductUploadData = Omit<
  ProductData,
  | "_id"
  | "status"
  | "createdAt"
  | "wishCount"
  | "wishUserIds"
  | "viewCount"
  | "block"
  | "reportCount"
  | "reportUserIds"
>;

export type ProductListType =
  | "TODAY"
  | "CATEGORY"
  | "SEARCH"
  | "PROFILE"
  | "MY_PROFILE";

export const enum TradingStatus {
  TRADING = "TRADING",
  CANCEL = "CANCEL",
  RETURN = "RETURN",
  TRADING_END = "TRADING_END",
  CANCEL_END = "CANCEL_END",
  RETURN_END = "RETURN_END",
}

export const enum SalesTradingProcess {
  판매중 = "판매 중",
  구매요청확인 = "구매 요청 확인",
  상품전달확인 = "상품 전달 확인",
  구매자상품인수중 = "구매자 상품 인수 중",
  거래완료 = "거래 완료",
}

export const enum PurchaseTradingProcess {
  구매요청 = "구매 요청",
  판매자확인중 = "판매자 확인 중",
  판매자상품전달중 = "판매자 상품 전달중",
  상품인수확인 = "상품 인수 확인",
  거래완료 = "거래 완료",
}

export const enum PurchaseCancelProcess {
  판매자확인중 = "판매자 확인 중",
  취소완료 = "취소 완료",
}

export const enum SalesCancelProcess {
  취소요청확인 = "취소 요청 확인",
  취소완료 = "취소 완료",
}

export const enum PurchaseReturnProcess {
  판매자확인중 = "판매자 확인 중",
  반품상품전달확인 = "반품 상품 전달 확인",
  판매자반품상품인수확인중 = "판매자 반품 상품 인수 확인 중",
  반품완료 = "반품 완료",
}

export const enum SalesReturnProcess {
  반품요청확인 = "반품 요청 확인",
  구매자반품상품전달중 = "구매자 반품 상품 전달 중",
  반품상품인수확인 = "반품 상품 인수 확인",
  반품완료 = "반품 완료",
}

export interface SaleTradingData {
  _id: string;
  seller: string;
  productId: string;
  status: TradingStatus;
  process: SalesTradingProcess | SalesCancelProcess | SalesReturnProcess;
  returnReason?: string;
  cancelReason?: string;
  saleStartDate: string;
  saleEndDate?: string;
  cancelStartDate?: string;
  cancelEndDate?: string;
  returnStartDate?: string;
  returnEndDate?: string;
  productData: {
    name: string;
    imgData: { url: string }[];
    price: string;
  };
  isReviewed: boolean;
}

export interface PurchaseTradingData {
  _id: string;
  seller: string;
  productId: string;
  status: TradingStatus;
  process:
    | PurchaseTradingProcess
    | PurchaseCancelProcess
    | PurchaseReturnProcess;
  returnReason?: string;
  cancelReason?: string;
  purchaseStartDate: string;
  purchaseEndDate?: string;
  cancelStartDate?: string;
  cancelEndDate?: string;
  returnStartDate?: string;
  returnEndDate?: string;
  productData: {
    name: string;
    imgData: { url: string }[];
    price: string;
  };
  isReviewed: boolean;
}

export interface ProductReviewData {
  reviewTags: number[];
  reviewScore: number;
  reviewContent: number;
  reviewer: {
    nickname: string;
    profileImg: string;
  };
}
