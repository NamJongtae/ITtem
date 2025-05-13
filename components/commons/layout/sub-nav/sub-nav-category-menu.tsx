import { CATEGORY } from "@/constants/constant";
import { forwardRef } from "react";
import { escKeyClose } from "@/lib/optimizationKeyboard";
import SubNavCategoryMenuItem from "./sub-nav-category-menu-item";

interface IProps {
  currentCategory: string | null;
  toggleCategory: () => void;
}

const SubNavCategoryMenu = forwardRef<HTMLDivElement, IProps>(
  ({ currentCategory, toggleCategory }, ref) => {
    return (
      <div
        className="absolute top-[40px] md:top-[54px] left-4 md:left-8 w-[200px] bg-white z-40 border"
        ref={ref}
        onKeyDown={(e) => {
          escKeyClose({ event: e, closeCb: toggleCategory });
        }}
      >
        <h2 className="text-center font-semibold py-2 border-b border-gray-400">
          전체 카테고리
        </h2>
        <ul className="flex flex-col w-full h-full py-5 bg-white max-h-[calc(100vh-240px)] overflow-y-scroll scrollbar">
          {CATEGORY.map((category, index) => (
            <SubNavCategoryMenuItem
              key={category}
              category={category}
              currentCategory={currentCategory}
              index={index}
            />
          ))}
        </ul>
      </div>
    );
  }
);

SubNavCategoryMenu.displayName = "SubNavCategoryMenu";

export default SubNavCategoryMenu;
