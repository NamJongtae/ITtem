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
  reviewContent: string;
  reviewer: {
    nickname: string;
    profileImg: string;
  };
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
