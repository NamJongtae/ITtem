import { CATEGORY } from "@/constants/constant";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import React, { useRef } from "react";

interface IParams {
  currentCategory: string | null;
}

export default function useNavCategoryMenu({ currentCategory }: IParams) {
  const isActiveCategory = (category: string) =>
    currentCategory === category ||
    (currentCategory === null && category === "전체");

  const activeCategoryClassName = (category: string) =>
    `${isActiveCategory(category) ? "bg-red-400 text-white" : ""}`;

  const firstCategoryRef = useRef<HTMLAnchorElement | null>(null);
  const lastCategoryRef = useRef<HTMLAnchorElement | null>(null);
  const lastCategoryPreviousRef = useRef<HTMLAnchorElement | null>(null);

  const setCategoryLinkRef = (index: number) => {
    if (index === 0) {
      return firstCategoryRef;
    }
    if (index === CATEGORY.length - 1) {
      return lastCategoryRef;
    }
    if (index === CATEGORY.length - 2) {
      return lastCategoryPreviousRef;
    }
    return null;
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

  return { activeCategoryClassName, setCategoryLinkRef, categoryOnKeyDown };
}
