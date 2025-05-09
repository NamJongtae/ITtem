import { SaleTradingData } from "@/types/product-types";
import useSaleActionBtns from '@/hooks/product-manage/useSaleActionBtns';

interface IProps {
  tradingData: SaleTradingData;
}

export default function SaleTradingBtns({ tradingData }: IProps) {
  const Button = useSaleActionBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
