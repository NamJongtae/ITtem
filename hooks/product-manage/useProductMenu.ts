import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import { useState } from "react";

export default function useProductMenu() {
  const [menu, setMenu] = useState<ProductManageMenu>("판매");

  const handleChangeMenu = (menu: ProductManageMenu) => {
    setMenu(menu);
  };

  return { menu, handleChangeMenu };
}
