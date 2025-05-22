import { PurchaseTradingData } from "@/domains/product/types/product-types";
import usePurchaseActionBtns from "@/domains/product/hooks/manage/usePurchaseActionBtns";

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function PurchaseTradingBtns({ tradingData }: IProps) {
  const Button = usePurchaseActionBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
