import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "../product-manage-page";
import ProductManageItemTradingBtns from "./product-manage-item-trading-btns";
import ProductManageItemTradingEndBtns from "./product-manage-item-trading-end-btns";
import ProductManageItemCancelReturnBtns from "./product-manage-item-cancel-return-btns";

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
    <div className="shrink-0">
      {detailMenu === "거래중" && (
        <ProductManageItemTradingBtns menu={menu} tradingData={tradingData} />
      )}
      {detailMenu === "거래완료 내역" && (
        <ProductManageItemTradingEndBtns
          menu={menu}
          tradingData={tradingData}
        />
      )}
      {(detailMenu === "취소/반품 내역" ||
        detailMenu === "취소/반품 거절 내역") && (
        <ProductManageItemCancelReturnBtns tradingData={tradingData} />
      )}
    </div>
  );
}
