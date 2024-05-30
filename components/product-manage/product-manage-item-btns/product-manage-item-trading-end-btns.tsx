import {
  PurchaseTradingData,
  SaleTradingData,
  TradingStatus,
} from "@/types/productTypes";
import { ProductManageMenu } from "../product-manage-page";
import PurchaseTradingEndReviewUploadBtn from "./purchase-trading-end-btn/purchase-trading-end-review-upload-btn";
import PurchaseTradingEndReviewBtn from "./purchase-trading-end-btn/purchase-trading-end-review-btn";
import SaleTradingEndReviewBtn from "./sale-trading-end-btn/sale-trading-end-review-btn";
import PurchaseTradingReturnBtn from "./purchase-trading-btns/purchase-trading-return-btn";
import PurchaseTradingEndTradingDetailBtn from "./purchase-trading-end-btn/purchase-trading-end-trading-detail-btn";
import SeleTradingEndTradingDetailBtn from "./sale-trading-end-btn/sale-trading-end-trading-detail-btn";
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
