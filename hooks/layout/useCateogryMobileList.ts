import { CATEGORY } from "@/domains/product/constants/constants";
import { optimizationTabFocus } from "@/utils/optimizationKeyboard";
import { useRef } from "react";

interface IParams {
  currentCategory: string | null;
}

export default function useCateogryMobileList({ currentCategory }: IParams) {
  const firstCategoryRef = useRef<HTMLButtonElement | null>(null);
  const lastCategoryRef = useRef<HTMLButtonElement | null>(null);
  const lastCategoryPreviousRef = useRef<HTMLButtonElement | null>(null);

  const setCategoryClassName = (category: string) =>
    `${
      currentCategory === category &&
      "bg-gray-700 text-white betterhover:hover:text-black betterhover:hover:bg-gray-200"
    } text-gray-700 block px-3 py-2 text-sm w-full text-left rounded-md betterhover:hover:bg-gray-100 transition duration-150 ease-in-out`;

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

  return { setCategoryClassName, setCategoryBtnRef, categoryOnKeyDown };
}
