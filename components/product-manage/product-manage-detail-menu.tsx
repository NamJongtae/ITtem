import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "./product-manage-page";

interface IPros {
  detailMenu: ProductManageDeatilMenu;
  handleClickDeatilMenu: (
    e: React.MouseEvent<HTMLButtonElement>,
    detailMenu: ProductManageDeatilMenu
  ) => void;
}

export default function ProductManageDetailMenu({
  detailMenu,
  handleClickDeatilMenu,
}: IPros) {
  const menuList: ProductManageDeatilMenu[] = [
    "거래중",
    "거래완료 내역",
    "취소/반품 내역",
  ];

  return (
    <ul className="flex gap-3 text-sm mt-3">
      {menuList.map((menu: ProductManageDeatilMenu) => (
        <li key={menu}>
          <button
            data-status={
              menu === "거래중"
                ? "TRADING"
                : menu === "거래완료 내역"
                ? "END"
                : "CANCEL/RETURN"
            }
            onClick={(e) => handleClickDeatilMenu(e, menu)}
            className={`${detailMenu === menu && "text-white bg-gray-700"} ${
              detailMenu !== menu && "betterhover:hover:bg-gray-100"
            } border border-gray-400 rounded-md py-2 px-4`}
          >
            {menu}
          </button>
        </li>
      ))}
    </ul>
  );
}
