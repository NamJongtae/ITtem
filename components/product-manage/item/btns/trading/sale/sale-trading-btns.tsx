import { SaleTradingData } from "@/types/product-types";
import useSaleTradingBtns from "@/hooks/product-manage/useSaleTradingBtns";

interface IProps {
  tradingData: SaleTradingData;
}

export default function SaleTradingBtns({ tradingData }: IProps) {
  const Button = useSaleTradingBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
