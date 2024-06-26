import { PurchaseTradingData } from "@/types/productTypes";
import usePurchaseTradingBtns from "@/hooks/productManage/usePurchaseTradingBtns";

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function PurchaseTradingBtns({ tradingData }: IProps) {
  const Button = usePurchaseTradingBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
