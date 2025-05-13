import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";
import SaleTradingBtns from "./sale/sale-trading-btns";
import PurchaseTradingBtns from "./purchase/purchase-trading-btns";

interface IProps {
  isSoldMenu: boolean;
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function TradingBtns({ isSoldMenu, tradingData }: IProps) {
  return isSoldMenu ? (
    <SaleTradingBtns tradingData={tradingData as SaleTradingData} />
  ) : (
    <PurchaseTradingBtns tradingData={tradingData as PurchaseTradingData} />
  );
}
