"use client";

import SubNavCategoryMenuIcon from "@/public/icons/menu_icon.svg";
import SubNavCategoryMenu from "./sub-nav-category-menu";
import useNavCategory from "@/hooks/commons/layout/useNavCategory";
import { escKeyClose } from "@/lib/optimizationKeyboard";
import SubNavMenu from "./sub-nav-menu";

export default function SubNav() {
  const {
    isOpenCategory,
    toggleCategory,
    categoryRef,
    buttonRef,
    currentCategory,
  } = useNavCategory();

  return (
    <nav className="relative flex justify-between px-4 sm:px-8 pb-4 max-w-[1024px] mx-auto">
      <div className="flex gap-3 items-center">
        <button
          onClick={toggleCategory}
          ref={buttonRef}
          onKeyDown={(e) => escKeyClose({ event: e, closeCb: toggleCategory })}
          aria-label="카테고리 메뉴"
        >
          <SubNavCategoryMenuIcon
            className={`w-6 h-6 ${
              isOpenCategory ? "fill-red-400" : "fill-black"
            }`}
          />
        </button>
        {isOpenCategory && (
          <SubNavCategoryMenu
            toggleCategory={toggleCategory}
            currentCategory={currentCategory}
            ref={categoryRef}
          />
        )}
      </div>
      <SubNavMenu />
    </nav>
  );
}
