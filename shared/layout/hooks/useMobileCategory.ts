import { useRouter } from "next/navigation";
import useDropdownMenu from "../../common/hooks/useDropDownMenu";

export default function useMobileCategory(makeHref: (id: number) => string) {
  const router = useRouter();
  const { isOpenMenu, toggleMenu, menuRef, closeMenu } = useDropdownMenu();

  const handleSelectMenu = (id: number) => {
    closeMenu();
    router.push(makeHref(id));
  };

  return { isOpenMenu, toggleMenu, handleSelectMenu, menuRef };
}
