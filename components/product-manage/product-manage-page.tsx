"use client";

import ProductManageMenu from "./product-manage-menu";
import ProductManageDetailMenu from "./product-manage-detail-menu";
import ProductManageSearchBar from "./product-manage-search-bar";
import useProductManagePage from "@/hooks/product-manage/useProductManagePage";
import { useSearchParams } from "next/navigation";
import ProductManageList from "./list/product-manage-list";

export type ProductManageMenu = "판매" | "구매";
export type ProductManageDeatilMenu =
  | "거래중"
  | "거래완료 내역"
  | "취소/반품 내역"
  | "취소/반품 거절 내역";

export default function ProductManagePage() {
  const searchParam = useSearchParams();
  const status = searchParam.get("status");

  const initalDetailMenu =
    status === "CANCEL_END/RETURN_END"
      ? "취소/반품 내역"
      : status === "TRADING_END"
      ? "거래완료 내역"
      : status === "CANCEL_REJECT/RETURN_REJECT"
      ? "취소/반품 거절 내역"
      : "거래중";

  const { menu, detailMenu, handleClickMenu, handleClickDeatilMenu } =
    useProductManagePage({ initalDetailMenu });

  return (
    <div className="max-w-[1024px] mx-auto mt-8 px-4 md:px-8">
      <h2 className="sr-only">{`${menu} 상품관리`}</h2>
      <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-5">
        <ProductManageSearchBar />
        <ProductManageMenu menu={menu} handleClickMenu={handleClickMenu} />
      </div>

      <ProductManageDetailMenu
        detailMenu={detailMenu}
        handleClickDeatilMenu={handleClickDeatilMenu}
      />

      <ProductManageList menu={menu} detailMenu={detailMenu} />
    </div>
  );
}
