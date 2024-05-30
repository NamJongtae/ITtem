import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "../product-manage-page";
import ProductManageItemTradingBtns from "./product-manage-item-trading-btns";
import ProductManageItemTradingEndBtns from './product-manage-item-trading-end-btns';

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
  return (
    <>
      {detailMenu === "거래중" && (
        <ProductManageItemTradingBtns menu={menu} tradingData={tradingData} />
      )}
      {detailMenu === "거래완료 내역" && (
        <ProductManageItemTradingEndBtns menu={menu} tradingData={tradingData} />
      )}
    </>
  );
}
