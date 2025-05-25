import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDropdownMenu from "../../common/hooks/useDropDownMenu";

export default function useMobileCategory() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpenMenu, toggleMenu, menuRef, closeMenu } = useDropdownMenu();
  const search = useSearchParams();
  const keyword = search.get("keyword");

  const handleSelectMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.getAttribute("data-category");
    if (!category) return;
    closeMenu();
    router.push(
      category === "전체"
        ? keyword
          ? `${pathname}?keyword=${keyword}`
          : pathname
        : keyword
          ? `${pathname}?keyword=${keyword}&category=${category}`
          : `${pathname}?category=${category}`
    );
  };

  return { isOpenMenu, toggleMenu, handleSelectMenu, menuRef };
}
