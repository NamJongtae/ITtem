import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "@/components/product-manage/product-manage-page";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface IParams {
  initalDetailMenu: ProductManageDeatilMenu;
}

export default function useProductManagePage({ initalDetailMenu }: IParams) {
  const router = useRouter();
  const [menu, setMenu] = useState<ProductManageMenu>("판매");
  const [detailMenu, setDetailMenu] =
    useState<ProductManageDeatilMenu>(initalDetailMenu);

  const searchParams = router.query?.search || "";

  const handleClickMenu = useCallback((menu: ProductManageMenu) => {
    setMenu(menu);
  }, []);

  const handleClickDeatilMenu = useCallback(
    (detailMenu: ProductManageDeatilMenu) => {
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
    },
    []
  );

  return { menu, detailMenu, handleClickMenu, handleClickDeatilMenu };
}
