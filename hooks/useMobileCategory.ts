import { usePathname, useRouter } from "next/navigation";
import useDropdownMenu from "./useDropDownMenu";

export default function useMobileCategory() {
  const router = useRouter();
  const path = usePathname();
  const { isOpenMenu, toggleMenu, menuRef, closeMenu } =
    useDropdownMenu();

  const handleSelectMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.getAttribute("data-category");
    if (!category) return;
    closeMenu();
    if (category==="전체") {
      router.push(`/product`);
    }
    router.push(`/${path.replace("/", "")}?category=${category}`);
  };

  return { isOpenMenu, toggleMenu, handleSelectMenu, menuRef };
}
