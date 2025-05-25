import { PurchaseTradingData } from "@/domains/product/manage/types/productManageTypes";
import usePurchaseActionBtns from "@/domains/product/manage/hooks/usePurchaseActionBtns";

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function PurchaseTradingBtns({ tradingData }: IProps) {
  const Button = usePurchaseActionBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
