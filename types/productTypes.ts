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

export interface PurchaseTradingData {
  _id: string;
  buyer: string;
  productId: string;
  purchaseStartDate: string;
  purchaseEndDate?: string;
  status: TradingStatus;
  process: PurchaseTradingProcess;
  cancelReason?: string;
  cancelStartDate?: string;
  cancelEndDate?: string;
  refundReason?: string;
  refundStartDate?: string;
  refundEndDate?: string;
}

export const enum TradingStatus {
  TRADING = "TRADING",
  CANCEL = "CANCEL",
  RETURN = "RETURN",
  TRADING_END = "TRADING_END",
  CANCEL_END = "CANCEL_END",
  RETURN_END = "RETURN_END",
}

export const enum SalesTradingProcess {
  판매중 = "판매중",
  구매요청확인 = "구매요청확인",
  상품전달확인 = "상품전달확인",
  구매자상품인수중 = "구매자상품인수중",
  거래완료 = "거래완료",
}

export const enum PurchaseTradingProcess {
  구매요청 = "구매요청",
  판매자확인중 = "판매자확인중",
  판매자상품전달중 = "판매자상품전달중",
  상품인수확인 = "상품인수확인",
  거래완료 = "거래완료",
}

export const enum PurchaseCancelProcess {
  취소요청 = "취소요청",
  취소완료 = "취소완료",
}

export const enum SalesCancelProcess {
  취소요청확인 = "취소요청확인",
  취소완료 = "취소완료",
}

export const enum PurchaseReturnProcess {
  판매자확인중 = "판매자확인중",
  반품상품전달확인 = "반품상품전달확인",
  판매자반품상품인수확인중 = "판매자반품상품인수확인중",
  반품완료 = "반품완료",
}

export const enum SalesReturnProcess {
  반품요청확인 = "반품요청확인",
  구매자반품상품전달중 = "구매자반품상품전달중",
  판매자반품상품인수확인 = "판매자반품상품인수확인",
  반품완료 = "반품완료",
}
