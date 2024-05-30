import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { ProductManageMenu } from "../product-manage-page";
import SaleTradingBtns from "./sale-trading-btns/sale-trading-btns";
import PurchaseTradingBtns from "./purchase-trading-btns/purchase-trading-btns";

interface IProps {
  menu: ProductManageMenu;
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemTradingBtns({
  menu,
  tradingData,
}: IProps) {
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
