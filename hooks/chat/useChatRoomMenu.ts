import { useRef, useState } from "react";

export default function useChatRoomMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const toggleMenu = () => {
    if (isOpenMenu) {
      if (!menuRef.current) return;
      menuRef.current.classList.remove("animate-slideOutLeft");
      menuRef.current.classList.add("animate-slideOutRight");
      timerRef.current = setTimeout(() => {
        closeMenu();
      }, 480);
      return;
    }
    openMenu();
  };

  return { isOpenMenu, closeMenu, openMenu, toggleMenu, menuRef, timerRef };
}
