import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";
import SaleTradingEndBtns from "./sale/sale-trading-end-btns";
import PurchaseTradingEndBtns from "./purchase/purchase-trading-end-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  isSoldMenu: boolean;
}
export default function TradingEndBtns({ tradingData, isSoldMenu }: IProps) {
  return isSoldMenu ? (
    <SaleTradingEndBtns tradingData={tradingData} />
  ) : (
    <PurchaseTradingEndBtns tradingData={tradingData} />
  );
}
