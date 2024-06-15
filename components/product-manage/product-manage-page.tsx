import ProductManageMenu from "./product-manage-menu";
import ProductManageList from "./product-manage-list";
import ProductManageDetailMenu from "./product-manage-detail-menu";
import ProductManageSearch from "./product-manage-search";
import useProductManagePage from "@/hooks/productManage/useProductManagePage";

export type ProductManageMenu = "판매" | "구매";
export type ProductManageDeatilMenu =
  | "거래중"
  | "거래완료 내역"
  | "취소/반품 내역"
  | "취소/반품 거절 내역";

interface IProps {
  initalDetailMenu: ProductManageDeatilMenu;
}

export default function ProductManagePage({ initalDetailMenu }: IProps) {
  const { menu, detailMenu, handleClickMenu, handleClickDeatilMenu } =
    useProductManagePage({ initalDetailMenu });

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

      <ProductManageList menu={menu} detailMenu={detailMenu} />
    </div>
  );
}
