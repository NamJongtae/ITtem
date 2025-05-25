import useNavSell from "@/shared/layout/hooks/useNavSell";
import SellIcon from "@/public/icons/money-icon.svg";

export default function SellBtn() {
  const { pathname, handleClickSell } = useNavSell();

  return (
    <button
      onClick={handleClickSell}
      className={`inline-flex flex-col items-center gap-[2px] text-xs ${
        pathname === "/product/upload" && "text-indigo-500"
      }`}
    >
      <SellIcon
        className={`${
          pathname === "/product/upload" ? "fill-indigo-500" : "fill-black"
        } w-5 h-5`}
      />
      판매
    </button>
  );
}
