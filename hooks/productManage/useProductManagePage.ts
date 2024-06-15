import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "@/components/product-manage/product-manage-page";
import { useRouter } from "next/router";
import { useState } from "react";

interface IPrarms {
  initalDetailMenu: ProductManageDeatilMenu;
}

export default function useProductManagePage({ initalDetailMenu }: IPrarms) {
  const router = useRouter();
  const [menu, setMenu] = useState<ProductManageMenu>("판매");
  const [detailMenu, setDetailMenu] =
    useState<ProductManageDeatilMenu>(initalDetailMenu);

  const searchParams = router.query?.search || "";

  const handleClickMenu = (menu: ProductManageMenu) => {
    setMenu(menu);
  };

  const handleClickDeatilMenu = (detailMenu: ProductManageDeatilMenu) => {
    setDetailMenu(detailMenu);
    const status =
      detailMenu === "거래중"
        ? "TRADING"
        : detailMenu === "거래완료 내역"
        ? "TRADING_END"
        : detailMenu === "취소/반품 내역"
        ? "CANCEL_END/RETURN_END"
        : "CANCEL_REJECT/RETURN_REJECT";

    const newUrl = `/product/manage${
      searchParams
        ? `?search=${searchParams}&status=${status}`
        : `?status=${status}`
    }`;
    router.push(newUrl);
  };

  return { menu, detailMenu, handleClickMenu, handleClickDeatilMenu };
}
