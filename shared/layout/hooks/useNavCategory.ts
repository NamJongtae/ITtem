import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useNavCategory() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const params = useParams();
  const id = Number(params?.categoryId);
  const currentCategoryId =
    Number.isInteger(id) && id >= 0 && id <= 13 ? id : 0;


  const currentCategory = CATEGORY[currentCategoryId] ?? ProductCategory.전체;

  const openCategory = () => {
    setIsOpenCategory(true);
  };

  const closeCategory = () => {
    setIsOpenCategory(false);
  };

  const toggleCategory = () => {
    if (isOpenCategory) {
      closeCategory();
      return;
    }
    openCategory();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeCategory();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    isOpenCategory,
    toggleCategory,
    closeCategory,
    categoryRef,
    buttonRef,
    currentCategory
  };
}
