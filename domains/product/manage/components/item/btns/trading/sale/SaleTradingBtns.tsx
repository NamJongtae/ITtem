import { SaleTradingData } from "@/domains/product/manage/types/productManageTypes";
import useSaleActionBtns from "@/domains/product/manage/hooks/useSaleActionBtns";

interface IProps {
  tradingData: SaleTradingData;
}

export default function SaleTradingBtns({ tradingData }: IProps) {
  const Button = useSaleActionBtns({ tradingData });

  return Button ? (
    <div className="flex flex-row justify-end sm:flex-col gap-3">{Button}</div>
  ) : null;
}
