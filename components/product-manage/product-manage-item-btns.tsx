import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "./product-manage-page";
import ProductManageItemTradingBtns from "./product-manage-item-trading-btns";
import ProductManageItemTradingEndBtn from "./product-manage-item-trading-end-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
  detailMenu: ProductManageDeatilMenu;
}
export default function ProductManageItemBtns({
  tradingData,
  menu,
  detailMenu,
}: IProps) {
  if (detailMenu === "거래중") {
    return (
      <ProductManageItemTradingBtns menu={menu} tradingData={tradingData} />
    );
  } else if (detailMenu === "거래완료 내역") {
    return (
      <ProductManageItemTradingEndBtn menu={menu} tradingData={tradingData} />
    );
  }
  return null;
}
