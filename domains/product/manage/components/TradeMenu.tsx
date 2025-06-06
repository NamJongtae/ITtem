import { ProductManageMenuType } from "../types/productManageTypes";

interface IProps {
  menu: ProductManageMenuType;
  handleClickMenu: (menu: ProductManageMenuType) => void;
}

export default function TradeMenu({ menu, handleClickMenu }: IProps) {
  const isSaleMenu = menu === "sale";
  const isPurchaseManu = menu === "purchase";

  return (
    <ul className="flex gap-3 font-sm text-gray-400 font-semibold shrink-0 sm:pl-3">
      <li className="relative before:-right-[7px] before:absolute before:top-[5px] before:h-4 before:w-[1px] before:bg-gray-600">
        <button
          onClick={() => handleClickMenu("sale")}
          className={
            isSaleMenu || (!isSaleMenu && !isPurchaseManu)
              ? "text-red-500"
              : "text-inherit"
          }
        >
          판매
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClickMenu("purchase")}
          className={isPurchaseManu ? "text-red-500" : "text-inherit"}
        >
          구매
        </button>
      </li>
    </ul>
  );
}
