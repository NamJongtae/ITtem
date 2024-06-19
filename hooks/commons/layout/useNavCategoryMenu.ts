import { CATEGORY } from "@/constants/constant";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

interface IPrarms {
  currentCategory: string | null;
}

export default function useNavCategoryMenu({ currentCategory }: IPrarms) {
  const pathname = usePathname();

  const setCategoryClassName = (category: string) => {
    return `${
      (pathname.includes("product") &&
        currentCategory === null &&
        category === "전체") ||
      currentCategory === category
        ? "bg-red-400 text-white"
        : "bg-none text-inherit"
    } block pl-5 py-2 w-full h-full text-sm betterhover:hover:bg-red-400 betterhover:hover:text-white`;
  };

  const firstCategoryRef = useRef<HTMLAnchorElement | null>(null);
  const lastCatgoryRef = useRef<HTMLAnchorElement | null>(null);
  const lastCategoryPreviousRef = useRef<HTMLAnchorElement | null>(null);

  const setCategoryLinkRef = (index: number) => {
    return index === 0
      ? firstCategoryRef
      : index === CATEGORY.length - 1
      ? lastCatgoryRef
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
        previousTarget: lastCatgoryRef.current,
      });
    }
  };

  return { setCategoryClassName, setCategoryLinkRef, categoryOnKeyDown };
}
