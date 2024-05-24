import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { ProductManageMenu } from "./product-manage-page";
import ProductManageItemSaleTradingBtn from "./product-manage-item-sale-trading-btn";
import ProductManageItemPurchaseTradingBtn from './product-manage-item-purchase-trading-btn';

interface IProps {
  menu: ProductManageMenu;
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemTradingBtns({
  menu,
  tradingData,
}: IProps) {
  if (menu === "판매" && "saleStartDate" in tradingData) {
    return <ProductManageItemSaleTradingBtn tradingData={tradingData} />;
  } else if (menu === "구매" && "purchaseStartDate" in tradingData) {
    return <ProductManageItemPurchaseTradingBtn tradingData={tradingData} />;
  }
  return null; 
}
