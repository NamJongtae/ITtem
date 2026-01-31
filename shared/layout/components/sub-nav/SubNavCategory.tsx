"use client";

import { escKeyClose } from "@/shared/common/utils/escKeyClose";
import useNavCategory from "../../hooks/useNavCategory";
import CategoryMenu from "./CategoryMenu";
import CategoryMenuIcon from "@/public/icons/menu-icon.svg";

export default function SubNavCategory() {
  const {
    isOpenCategory,
    toggleCategory,
    closeCategory,
    categoryRef,
    buttonRef
  } = useNavCategory();

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={toggleCategory}
        ref={buttonRef}
        onKeyDown={(e) => escKeyClose({ event: e, closeCb: toggleCategory })}
        aria-label="카테고리 메뉴"
      >
        <CategoryMenuIcon
          className={`w-6 h-6 ${
            isOpenCategory ? "fill-red-400" : "fill-black"
          }`}
        />
      </button>
      {isOpenCategory && (
        <CategoryMenu
          toggleCategory={toggleCategory}
          closeCategory={closeCategory}
          ref={categoryRef}
        />
      )}
    </div>
  );
}
