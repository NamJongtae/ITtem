import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import CancelReturnBtns from "./cancel-return-btns/cancel-return-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemCancelReturnBtns({
  tradingData,
}: IProps) {
  return <CancelReturnBtns tradingData={tradingData} />;
}
