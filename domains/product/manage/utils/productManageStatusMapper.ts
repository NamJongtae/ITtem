import {
  ProductManageQueryStatusType,
  ProductManageStatusType
} from "../types/productManageTypes";

export const productStatusParser: Record<
  ProductManageQueryStatusType,
  ProductManageStatusType
> = {
  TRADING: "거래중",
  TRADING_END: "거래완료 내역",
  "CANCEL_END/RETURN_END": "취소/반품 내역",
  "CANCEL_REJECT/RETURN_REJECT": "취소/반품 거절 내역"
};

export const productStatusEncoder: Record<
  ProductManageStatusType,
  ProductManageQueryStatusType
> = {
  거래중: "TRADING",
  "거래완료 내역": "TRADING_END",
  "취소/반품 내역": "CANCEL_END/RETURN_END",
  "취소/반품 거절 내역": "CANCEL_REJECT/RETURN_REJECT"
};
