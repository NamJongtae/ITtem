import React from "react";
import ProductCancelReturnDetailBtn from "./product-cancel-return-detail-btn";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function CancelReturnBtns({ tradingData }: IProps) {
  return (
    <div className="flex flex-row justify-end sm:flex-col gap-3">
      <ProductCancelReturnDetailBtn tradingData={tradingData} />
    </div>
  );
}
