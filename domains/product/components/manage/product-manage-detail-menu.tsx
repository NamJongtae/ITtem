import { ProductManageStatusType } from "../../types/product-types";

interface IPros {
  productManageStatus: ProductManageStatusType;
  handleClickDeatilMenu: (productManageStatus: ProductManageStatusType) => void;
}

export default function ProductManageDetailMenu({
  productManageStatus,
  handleClickDeatilMenu
}: IPros) {
  const menuList: ProductManageStatusType[] = [
    "거래중",
    "거래완료 내역",
    "취소/반품 내역",
    "취소/반품 거절 내역"
  ];

  return (
    <ul className="flex gap-3 text-sm mt-3 flex-wrap">
      {menuList.map((menu: ProductManageStatusType) => (
        <li key={menu}>
          <button
            onClick={() => handleClickDeatilMenu(menu)}
            className={`${productManageStatus === menu && "text-white bg-gray-700"} ${
              productManageStatus !== menu && "betterhover:hover:bg-gray-100"
            } border border-gray-400 rounded-md py-2 px-4`}
          >
            {menu}
          </button>
        </li>
      ))}
    </ul>
  );
}
