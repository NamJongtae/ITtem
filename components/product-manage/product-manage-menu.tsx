import type { ProductManageMenu } from "./product-manage-page";

interface IProps {
  menu: ProductManageMenu;
  handleClickMenu: (menu: ProductManageMenu) => void;
}

export default function ProductManageMenu({ menu, handleClickMenu }: IProps) {
  return (
    <ul className="flex gap-3 font-sm text-gray-400 font-semibold shrink-0 sm:pl-3">
      <li className="relative before:-right-[7px] before:absolute before:top-[5px] before:h-4 before:w-[1px] before:bg-gray-600">
        <button
          onClick={() => handleClickMenu("판매")}
          className={menu === "판매" ? "text-red-500" : "text-inherit"}
        >
          판매
        </button>
      </li>
      <li>
        <button
          onClick={() => handleClickMenu("구매")}
          className={menu === "구매" ? "text-red-500" : "text-inherit"}
        >
          구매
        </button>
      </li>
    </ul>
  );
}
