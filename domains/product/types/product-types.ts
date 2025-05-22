import { ApiResponse } from "@/types/response-types";

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
  전자기기 = "전자기기"
}

export enum ProductCondition {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D"
}

export enum ProductTransaction {
  직거래 = "직거래",
  택배 = "택배",
  모두 = "모두"
}

export enum ProductSellType {
  중고거래 = "중고거래",
  무료나눔 = "무료나눔"
}

export type ProductReturnPolicy = "가능" | "불가능";

export type ProductDeliveryFee = "포함" | "비포함";

export enum ProductStatus {
  soldout = "soldout",
  trading = "trading",
  sold = "sold"
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
  | "RECOMMEND"
  | "POPULAR"
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
  CANCEL_REJECT = "CANCEL_REJECT",
  RETURN_REJECT = "RETURN_REJECT"
}

export const enum SaleTradingProcess {
  판매중 = "판매 중",
  구매요청확인 = "구매 요청 확인",
  상품전달확인 = "상품 전달 확인",
  구매자상품인수중 = "구매자 상품 인수 중",
  거래완료 = "거래 완료"
}

export const enum PurchaseTradingProcess {
  구매요청 = "구매 요청",
  판매자확인중 = "판매자 확인 중",
  판매자상품전달중 = "판매자 상품 전달중",
  판매자반품거절상품전달중 = "판매자 반품 거절 상품 전달중",
  상품인수확인 = "상품 인수 확인",
  거래완료 = "거래 완료"
}

export const enum PurchaseCancelProcess {
  판매자확인중 = "판매자 확인 중",
  취소완료 = "취소 완료",
  취소거절 = "취소 거절"
}

export const enum SalesCancelProcess {
  취소요청확인 = "취소 요청 확인",
  취소완료 = "취소 완료",
  취소거절 = "취소 거절"
}

export const enum PurchaseReturnProcess {
  판매자확인중 = "판매자 확인 중",
  반품상품전달확인 = "반품 상품 전달 확인",
  판매자반품상품인수확인중 = "판매자 반품 상품 인수 확인 중",
  반품완료 = "반품 완료",
  반품거절 = "반품 거절"
}

export const enum SalesReturnProcess {
  반품요청확인 = "반품 요청 확인",
  구매자반품상품전달중 = "구매자 반품 상품 전달 중",
  반품상품인수확인 = "반품 상품 인수 확인",
  반품완료 = "반품 완료",
  반품거절 = "반품 거절"
}

export interface SaleTradingData {
  _id: string;
  sellerId: string;
  buyerId: string;
  sellerInfo: {
    nickname: string;
  };
  buyerInfo: {
    nickname: string;
  };
  productId: string;
  productName: string;
  productPrice: number;
  productImg: string;
  status: TradingStatus;
  process: SaleTradingProcess | SalesCancelProcess | SalesReturnProcess;
  returnReason?: string;
  returnRejectReason?: string;
  cancelReason?: string;
  cancelRejectReason?: string;
  saleStartDate: string;
  saleEndDate?: string;
  cancelStartDate?: string;
  cancelEndDate?: string;
  cancelRejectDate?: string;
  returnStartDate?: string;
  returnEndDate?: string;
  returnRejectDate?: string;
  isReviewed: boolean;
}

export interface PurchaseTradingData {
  _id: string;
  sellerId: string;
  buyerId: string;
  sellerInfo: {
    nickname: string;
  };
  buyerInfo: {
    nickname: string;
  };
  productId: string;
  productName: string;
  productPrice: number;
  productImg: string;
  status: TradingStatus;
  process:
    | PurchaseTradingProcess
    | PurchaseCancelProcess
    | PurchaseReturnProcess;
  returnReason?: string;
  returnRejectReason?: string;
  cancelReason?: string;
  cancelRejectReason?: string;
  purchaseStartDate: string;
  purchaseEndDate?: string;
  cancelStartDate?: string;
  cancelEndDate?: string;
  cancelRejectDate?: string;
  returnStartDate?: string;
  returnEndDate?: string;
  returnRejectDate?: string;
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

export interface UploadImgResponseData {
  url: string;
  name: string;
}

export interface RecentProductData {
  productId: string;
  productName: string;
  productImg: string;
}

export interface KakaoAddressDocument {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
  };
  address_name: string;
  address_type: string;
  road_address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  };
  x: string;
  y: string;
}

export interface ProductReviewResponseData extends ApiResponse {
  review: ProductReviewData;
}

export type ProductManageMenuType = "sale" | "purchase";

export type ProductManageStatusType =
  | "거래중"
  | "거래완료 내역"
  | "취소/반품 내역"
  | "취소/반품 거절 내역";

export type ProductManageQueryStatusType =
  | "TRADING"
  | "TRADING_END"
  | "CANCEL_END/RETURN_END"
  | "CANCEL_REJECT/RETURN_REJECT";

export type ReviewTagsData =
  | "상품 정보와 실제 상품이 동일해요"
  | "친절해요"
  | "배송이 빨라요"
  | "채팅 답변이 빨라요"
  | "제품이 깔끔해요";
