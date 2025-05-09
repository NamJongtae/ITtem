import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";

import {
  ProductManageStaus,
  ProductManageMenu,
} from "../product-manage-page";
import ProductManageItemContents from "./contents/product-manage-item-contents";
import ProductManageItemBtns from "./btns/product-manage-item-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
  detailMenu: ProductManageStaus;
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
