import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { forwardRef } from "react";
import { escKeyClose } from "@/shared/common/utils/optimizationKeyboard";
import CategoryMenuItem from "./CategoryMenuItem";

interface IProps {
  toggleCategory: () => void;
}

const CategoryMenu = forwardRef<HTMLDivElement, IProps>(
  ({ toggleCategory }, ref) => {
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
            <CategoryMenuItem
              key={category}
              category={category}
              index={index}
            />
          ))}
        </ul>
      </div>
    );
  }
);

CategoryMenu.displayName = "SubNavCategoryMenu";

export default CategoryMenu;
