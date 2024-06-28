import React from "react";
import useDropdownMenu from "../commons/useDropDownMenu";
import { ProductCategory } from "@/types/productTypes";

interface IParams {
  selectCategory: (category: ProductCategory) => void;
}

export default function useProfileDetailProductCategory({
  selectCategory,
}: IParams) {
  const { isOpenMenu, closeMenu, toggleMenu, menuRef } = useDropdownMenu();

  const handleClickCategory = (category: ProductCategory) => {
    selectCategory(category);
    closeMenu();
  };

  return { isOpenMenu, closeMenu, toggleMenu, menuRef, handleClickCategory };
}
