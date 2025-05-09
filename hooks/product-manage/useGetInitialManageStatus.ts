import { ProductManageStaus } from "@/components/product-manage/product-manage-page";
import { useGetQuerys } from "../commons/useGetQuerys";

export default function useGetInitialManageStatus() {
  const { status } = useGetQuerys("status");
  const toManageStatus = (): ProductManageStaus => {
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
  };
  const initialManageStatus = toManageStatus();

  return { initialManageStatus };
}
