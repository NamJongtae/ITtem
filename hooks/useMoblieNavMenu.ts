import { useRef, useState } from "react";

export default function useMoblieNavMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const closeMenu = () => {
    if (!menuRef.current) return;
    menuRef.current.classList.remove("animate-slideUp");
    menuRef.current.classList.add("animate-slideDown");
    setTimeout(() => {
      setIsOpenMenu(false);
    }, 280);
  };

  const toggleMenu = () => {
    if (isOpenMenu) {
      closeMenu();
      return;
    }
    openMenu();
  };

  return { isOpenMenu, toggleMenu, menuRef };
}
