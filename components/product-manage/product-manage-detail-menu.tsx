import { ProductManageStaus } from "./product-manage-page";

interface IPros {
  manageStatus: ProductManageStaus;
  handleClickDeatilMenu: (manageStatus: ProductManageStaus) => void;
}

export default function ProductManageDetailMenu({
  manageStatus,
  handleClickDeatilMenu,
}: IPros) {
  const menuList: ProductManageStaus[] = [
    "거래중",
    "거래완료 내역",
    "취소/반품 내역",
    "취소/반품 거절 내역",
  ];

  return (
    <ul className="flex gap-3 text-sm mt-3 flex-wrap">
      {menuList.map((menu: ProductManageStaus) => (
        <li key={menu}>
          <button
            onClick={() => handleClickDeatilMenu(menu)}
            className={`${manageStatus === menu && "text-white bg-gray-700"} ${
              manageStatus !== menu && "betterhover:hover:bg-gray-100"
            } border border-gray-400 rounded-md py-2 px-4`}
          >
            {menu}
          </button>
        </li>
      ))}
    </ul>
  );
}
