import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useNavCategory() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const search = useSearchParams();
  const pathname = usePathname();
  const currentCategory = search.get("category");

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

  useEffect(() => {
    if (isOpenCategory) closeCategory();
  }, [currentCategory, pathname]);

  return {
    isOpenCategory,
    toggleCategory,
    categoryRef,
    buttonRef,
    currentCategory,
  };
}
