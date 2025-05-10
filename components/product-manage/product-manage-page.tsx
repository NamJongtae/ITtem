"use client";

import ProductManageMenu from "./product-manage-menu";
import ProductManageDetailMenu from "./product-manage-detail-menu";
import ProductManageSearchBar from "./product-manage-search-bar";
import ProductManageList from "./list/product-manage-list";
import useProductManageStatus from "@/hooks/product-manage/useProductManageStatus";
import useProductMenu from "@/hooks/product-manage/useProductMenu";
import useInitialProductManageStatus from "@/hooks/product-manage/useInitialProductManageStatus";

export type ProductManageMenu = "판매" | "구매";
export type ProductManageStaus =
  | "거래중"
  | "거래완료 내역"
  | "취소/반품 내역"
  | "취소/반품 거절 내역";

export default function ProductManagePage() {
  const { menu, handleChangeMenu } = useProductMenu();
  const { initialProductManageStatus } = useInitialProductManageStatus();
  const { manageStatus, handleChangeManageStatus } = useProductManageStatus({
    initialProductManageStatus
  });

  return (
    <div className="max-w-[1024px] mx-auto mt-8 px-4 md:px-8">
      <h2 className="sr-only">{`${menu} 상품관리`}</h2>
      <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-5">
        <ProductManageSearchBar />
        <ProductManageMenu menu={menu} handleClickMenu={handleChangeMenu} />
      </div>

      <ProductManageDetailMenu
        manageStatus={manageStatus}
        handleClickDeatilMenu={handleChangeManageStatus}
      />

      <ProductManageList menu={menu} detailMenu={manageStatus} />
    </div>
  );
}
