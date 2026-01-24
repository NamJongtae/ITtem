import {
  ProductManageMenuType,
  ProductManageStatusType,
  PurchaseTradingData,
  SaleTradingData
} from "../../types/productManageTypes";
import ItemContents from "./contents/ItemContents";
import ItemBtns from "./btns/ItemBtns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenuType;
  productManageStatus: ProductManageStatusType;
}

export default function Item({
  tradingData,
  menu,
  productManageStatus
}: IProps) {
  return (
    <div className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between border-b py-5">
      <ItemContents
        tradingData={tradingData}
        productManageStatus={productManageStatus}
      />

      <ItemBtns
        tradingData={tradingData}
        menu={menu}
        productManageStatus={productManageStatus}
      />
    </div>
  );
}
