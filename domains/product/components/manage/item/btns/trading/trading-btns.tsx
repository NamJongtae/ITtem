import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/types/product-types";
import SaleTradingBtns from "./sale/sale-trading-btns";
import PurchaseTradingBtns from "./purchase/purchase-trading-btns";

interface IProps {
  isSaleMenu: boolean;
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function TradingBtns({ isSaleMenu, tradingData }: IProps) {
  return isSaleMenu ? (
    <SaleTradingBtns tradingData={tradingData as SaleTradingData} />
  ) : (
    <PurchaseTradingBtns tradingData={tradingData as PurchaseTradingData} />
  );
}
