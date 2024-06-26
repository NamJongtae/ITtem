import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import ProductManageItemBtns from "./product-manage-item-btns/product-manage-item-btns";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "./product-manage-page";
import ProductManageItemContents from "./product-manage-item-contents/product-manage-item-contents";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
  detailMenu: ProductManageDeatilMenu;
}

export default function ProductManageItem({
  tradingData,
  menu,
  detailMenu,
}: IProps) {
  return (
    <li className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between border-b py-5">
      <ProductManageItemContents
        tradingData={tradingData}
        detailMenu={detailMenu}
      />

      <ProductManageItemBtns
        tradingData={tradingData}
        menu={menu}
        detailMenu={detailMenu}
      />
    </li>
  );
}
