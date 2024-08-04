import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "../../product-manage-page";
import ProductMangeItemTradingBtns from "./trading/trading-btns";
import ProductMangeItemTradingEndBtns from "./trading-end/trading-end-btns";
import ProductMangeItemCancelReturnBtns from "./cancel-return/cancel-return-btns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
  detailMenu: ProductManageDeatilMenu;
}
export default function ProductMangeItemBtns({
  tradingData,
  menu,
  detailMenu,
}: IProps) {
  return (
    <div className="shrink-0">
      {detailMenu === "거래중" && (
        <ProductMangeItemTradingBtns menu={menu} tradingData={tradingData} />
      )}
      {detailMenu === "거래완료 내역" && (
        <ProductMangeItemTradingEndBtns menu={menu} tradingData={tradingData} />
      )}
      {(detailMenu === "취소/반품 내역" ||
        detailMenu === "취소/반품 거절 내역") && (
        <ProductMangeItemCancelReturnBtns tradingData={tradingData} />
      )}
    </div>
  );
}
