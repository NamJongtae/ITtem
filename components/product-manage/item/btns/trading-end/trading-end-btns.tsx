import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";
import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import SaleTradingEndBtns from "./sale/sale-trading-end-btns";
import PurchaseTradingEndBtns from "./purchase/purchase-trading-end-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
}
export default function TradingEndBtns({ tradingData, menu }: IProps) {
  return (
    <>
      {menu === "판매" && <SaleTradingEndBtns tradingData={tradingData} />}
      {menu === "구매" && <PurchaseTradingEndBtns tradingData={tradingData} />}
    </>
  );
}
