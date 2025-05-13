import {
  ProductManageMenuType,
  ProductManageStatusType,
  PurchaseTradingData,
  SaleTradingData
} from "@/types/product-types";
import ProductManageItemContents from "./contents/product-manage-item-contents";
import ProductManageItemBtns from "./btns/product-manage-item-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenuType;
  productManageStatus: ProductManageStatusType;
}

export default function ProductManageItem({
  tradingData,
  menu,
  productManageStatus
}: IProps) {
  return (
    <li className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between border-b py-5">
      <ProductManageItemContents
        tradingData={tradingData}
        productManageStatus={productManageStatus}
      />

      <ProductManageItemBtns
        tradingData={tradingData}
        menu={menu}
        productManageStatus={productManageStatus}
      />
    </li>
  );
}
