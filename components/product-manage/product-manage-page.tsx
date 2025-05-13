"use client";

import ProductManageMenu from "./product-manage-menu";
import ProductManageSearchBar from "./product-manage-search-bar";
import ProductManageList from "./list/product-manage-list";
import useProductManageStatus from "@/hooks/product-manage/useProductManageStatus";
import useProductMenu from "@/hooks/product-manage/useProductMenu";
import ProductManageStatusMenu from "./product-manage-status-menu";

export default function ProductManagePage() {
  const { menu, handleChangeMenu } = useProductMenu();
  const { productManageStatus, handleChangeManageStatus } =
    useProductManageStatus();

  return (
    <div className="max-w-[1024px] mx-auto mt-8 px-4 md:px-8">
      <h2 className="sr-only">{`${menu} 상품관리`}</h2>
      <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-5">
        <ProductManageSearchBar />
        <ProductManageMenu menu={menu} handleClickMenu={handleChangeMenu} />
      </div>

      <ProductManageStatusMenu
        productManageStatus={productManageStatus}
        handleChangeManageStatus={handleChangeManageStatus}
      />

      <ProductManageList
        menu={menu}
        productManageStatus={productManageStatus}
      />
    </div>
  );
}
