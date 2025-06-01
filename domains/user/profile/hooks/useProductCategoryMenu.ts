import useDropdownMenu from "@/shared/common/hooks/useDropDownMenu";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { useRef } from "react";

interface IParams {
  selectCategory: (category: ProductCategory) => void;
}

export default function useProductCategoryMenu({ selectCategory }: IParams) {
  const { isOpenMenu, closeMenu, toggleMenu, menuRef } = useDropdownMenu();

  const firstCategoryRef = useRef<HTMLButtonElement | null>(null);
  const lastCategoryRef = useRef<HTMLButtonElement | null>(null);
  const lastCategoryPreviousRef = useRef<HTMLButtonElement | null>(null);

  const setCategoryBtnRef = (index: number) => {
    return index === 0
      ? firstCategoryRef
      : index === CATEGORY.length - 1
        ? lastCategoryRef
        : index === CATEGORY.length - 2
          ? lastCategoryPreviousRef
          : null;
  };

  const categoryOnKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    if (index === CATEGORY.length - 1) {
      optimizationTabFocus({
        event: e,
        previousTarget: lastCategoryPreviousRef.current,
        nextTarget: firstCategoryRef.current
      });
    } else if (index === 0) {
      optimizationTabFocus({
        event: e,
        previousTarget: lastCategoryRef.current
      });
    }
  };

  const onClickCategory = (category: ProductCategory) => {
    selectCategory(category);
    closeMenu();
  };

  return {
    isOpenMenu,
    closeMenu,
    toggleMenu,
    menuRef,
    onClickCategory,
    setCategoryBtnRef,
    categoryOnKeyDown
  };
}
