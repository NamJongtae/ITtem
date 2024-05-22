import React, { useEffect, useState } from "react";
import ProductManageMenu from "./product-manage-menu";
import ProductManageList from "./product-manage-list";
import ProductManageDetailMenu from "./product-manage-detail-menu";
import ProductManageSearch from "./product-manage-search";
import { useRouter } from "next/router";

export type ProductManageMenu = "판매" | "구매";
export type ProductManageDeatilMenu =
  | "거래중"
  | "거래완료 내역"
  | "취소/반품 내역";

export default function ProductManagePage() {
  const router = useRouter();
  const [menu, setMenu] = useState<ProductManageMenu>("판매");
  const [detailMenu, setDetailMenu] =
    useState<ProductManageDeatilMenu>("거래중");

  const searchParams = router.query?.search || "";

  const handleClickMenu = (menu: ProductManageMenu) => {
    setMenu(menu);
  };

  const handleClickDeatilMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    detailMenu: ProductManageDeatilMenu
  ) => {
    setDetailMenu(detailMenu);

    const newUrl = `/product/manage${
      searchParams
        ? `?search=${searchParams}&status=${e.currentTarget.dataset.status}`
        : `?status=${e.currentTarget.dataset.status}`
    }`;
    router.push(newUrl);
  };

  useEffect(() => {
    setDetailMenu("거래중");
  }, [menu]);

  return (
    <div className="max-w-[1024px] mx-auto mt-8 px-4 md:px-8">
      <h2 className="sr-only">{`${menu} 상품관리`}</h2>
      <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-5">
        <ProductManageSearch />
        <ProductManageMenu menu={menu} handleClickMenu={handleClickMenu} />
      </div>

      <ProductManageDetailMenu
        detailMenu={detailMenu}
        handleClickDeatilMenu={handleClickDeatilMenu}
      />

      <ProductManageList />
    </div>
  );
}
