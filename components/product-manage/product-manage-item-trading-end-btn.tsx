import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { ProductManageMenu } from "./product-manage-page";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
}
export default function ProductManageItemTradingEndBtn({
  tradingData,
  menu,
}: IProps) {
  if (tradingData.process === "거래완료") {
    if (menu === "판매") {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
            리뷰보기
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <button className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600">
            리뷰작성
          </button>
          <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
            환불요청
          </button>
        </div>
      );
    }
  }
  return null;
}
