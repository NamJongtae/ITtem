import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/manage/types/productManageTypes";
import SaleTradingEndBtns from "./sale/SaleTradingEndBtns";
import PurchaseTradingEndBtns from "./purchase/PurchaseTradingEndBtns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  isSaleMenu: boolean;
}
export default function TradingEndBtns({ tradingData, isSaleMenu }: IProps) {
  return isSaleMenu ? (
    <SaleTradingEndBtns tradingData={tradingData} />
  ) : (
    <PurchaseTradingEndBtns tradingData={tradingData} />
  );
}
