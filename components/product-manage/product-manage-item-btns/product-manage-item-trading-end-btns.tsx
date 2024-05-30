import {
  PurchaseTradingData,
  SaleTradingData,
} from "@/types/productTypes";
import { ProductManageMenu } from "../product-manage-page";
import SaleTradingEndBtns from "./sale-trading-end-btn/sale-trading-end-btns";
import PurchaseTradingEndBtns from "./purchase-trading-end-btn/purchase-trading-end-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
}
export default function ProductManageItemTradingEndBtns({
  tradingData,
  menu,
}: IProps) {
  return (
    <>
      {menu === "판매" && <SaleTradingEndBtns tradingData={tradingData} />}
      {menu === "구매" && <PurchaseTradingEndBtns tradingData={tradingData} />}
    </>
  );
}
