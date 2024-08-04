import { PurchaseTradingData } from "@/types/product-types";
import usePurchaseTradingBtns from "@/hooks/product-manage/usePurchaseTradingBtns";

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function PurchaseTradingBtns({ tradingData }: IProps) {
  const Button = usePurchaseTradingBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
