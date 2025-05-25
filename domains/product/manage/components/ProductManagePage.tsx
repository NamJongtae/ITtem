"use client";

import TradeMenu from "./TradeMenu";
import SearchBar from "./SearchBar";
import List from "./list/List";
import useProductManageStatus from "../hooks/useProductManageStatus";
import useProductMenu from "../hooks/useProductMenu";
import StatusMenu from "./StatusMenu";

export default function ProductManagePage() {
  const { menu, handleChangeMenu } = useProductMenu();
  const { productManageStatus, handleChangeManageStatus } =
    useProductManageStatus();

  return (
    <div className="max-w-[1024px] mx-auto mt-8 px-4 md:px-8">
      <h2 className="sr-only">{`${menu} 상품관리`}</h2>
      <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-5">
        <SearchBar />
        <TradeMenu menu={menu} handleClickMenu={handleChangeMenu} />
      </div>

      <StatusMenu
        productManageStatus={productManageStatus}
        handleChangeManageStatus={handleChangeManageStatus}
      />

      <List menu={menu} productManageStatus={productManageStatus} />
    </div>
  );
}
