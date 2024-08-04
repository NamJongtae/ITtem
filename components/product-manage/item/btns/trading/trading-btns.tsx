import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { ProductManageMenu } from "../../../product-manage-page";
import SaleTradingBtns from "./sale/sale-trading-btns";
import PurchaseTradingBtns from "./purchase/purchase-trading-btns";

interface IProps {
  menu: ProductManageMenu;
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function TradingBtns({ menu, tradingData }: IProps) {
  return (
    <>
      {menu === "판매" && "saleStartDate" in tradingData && (
        <SaleTradingBtns tradingData={tradingData} />
      )}
      {menu === "구매" && "purchaseStartDate" in tradingData && (
        <PurchaseTradingBtns tradingData={tradingData} />
      )}
    </>
  );
}
