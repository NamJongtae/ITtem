import { PurchaseTradingData } from "@/types/product-types";
import usePurchaseActionBtns from '@/hooks/product-manage/usePurchaseActionBtns';

interface IProps {
  tradingData: PurchaseTradingData;
}

export default function PurchaseTradingBtns({ tradingData }: IProps) {
  const Button = usePurchaseActionBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
