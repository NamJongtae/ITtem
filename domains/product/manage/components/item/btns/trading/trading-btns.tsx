import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/manage/types/productManageTypes";
import SaleTradingBtns from "./sale/SaleTradingBtns";
import PurchaseTradingBtns from "./purchase/PurchaseTradingBtns";

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
