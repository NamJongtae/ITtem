import {
  ProductManageMenuType,
  ProductManageStatusType,
  PurchaseTradingData,
  SaleTradingData
} from "../../../types/productManageTypes";
import ProductMangeItemTradingBtns from "./trading/trading-btns";
import ProductMangeItemTradingEndBtns from "./trading-end/TradingEndBtns";
import ProductMangeItemCancelReturnBtns from "./cancel-return/CancelReturnBtns";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenuType;
  productManageStatus: ProductManageStatusType;
}

const ProductManageBtnsByStatus = ({
  productManageStatus,
  tradingData,
  menu
}: IProps) => {
  switch (productManageStatus) {
    case "거래중":
      return (
        <ProductMangeItemTradingBtns
          isSaleMenu={menu === "sale"}
          tradingData={tradingData}
        />
      );
    case "거래완료 내역":
      return (
        <ProductMangeItemTradingEndBtns
          isSaleMenu={menu === "sale"}
          tradingData={tradingData}
        />
      );
    case "취소/반품 내역":
    case "취소/반품 거절 내역":
      return <ProductMangeItemCancelReturnBtns tradingData={tradingData} />;
  }
};

export default function ItemBtns({
  tradingData,
  menu,
  productManageStatus
}: IProps) {
  return (
    <div className="shrink-0">
      <ProductManageBtnsByStatus
        tradingData={tradingData}
        productManageStatus={productManageStatus}
        menu={menu}
      />
    </div>
  );
}
