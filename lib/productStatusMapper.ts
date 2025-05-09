import { ProductManageStaus } from '@/components/product-manage/product-manage-page';

export function toManageStatus(status: string | null): ProductManageStaus {
  switch (status) {
    case "CANCEL_END/RETURN_END":
      return "취소/반품 내역";
    case "TRADING_END":
      return "거래완료 내역";
    case "CANCEL_REJECT/RETURN_REJECT":
      return "취소/반품 거절 내역";
    default:
      return "거래중";
  }
}

export function toQueryStatus(manageStatus: ProductManageStaus): string {
  switch (manageStatus) {
    case "취소/반품 내역":
      return "CANCEL_END/RETURN_END";
    case "거래완료 내역":
      return "TRADING_END";
    case "취소/반품 거절 내역":
      return "CANCEL_REJECT/RETURN_REJECT";
    default:
      return "TRADING";
  }
}
