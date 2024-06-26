import { CATEGORY } from "@/constants/constant";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

interface IPrarms {
  currentCategory: string | null;
}

export default function useNavCategoryMenu({ currentCategory }: IPrarms) {
  const pathname = usePathname();

  const activeCategoryClassName = (category: string) =>
    `${
      (pathname.includes("product") &&
        currentCategory === null &&
        category === "전체") ||
      currentCategory === category
        ? "bg-red-400 text-white"
        : ""
    }`;

  const firstCategoryRef = useRef<HTMLAnchorElement | null>(null);
  const lastCategoryRef = useRef<HTMLAnchorElement | null>(null);
  const lastCategoryPreviousRef = useRef<HTMLAnchorElement | null>(null);

  const setCategoryLinkRef = (index: number) => {
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
        nextTarget: firstCategoryRef.current,
      });
    } else if (index === 0) {
      optimizationTabFocus({
        event: e,
        previousTarget: lastCategoryRef.current,
      });
    }
  };

  return { activeCategoryClassName, setCategoryLinkRef, categoryOnKeyDown };
}
