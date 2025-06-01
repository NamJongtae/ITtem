import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import React, { useRef } from "react";

export default function useNavCategoryMenu() {
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

  return { setCategoryLinkRef, categoryOnKeyDown };
}
