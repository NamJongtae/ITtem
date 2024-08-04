"use client";

import ChatBtn from "./sub-nav-menu-chat-btn";
import SellBtn from "./sub-nav-menu-sell-btn";
import ProductBtn from "./sub-nav-menu-product-btn";
import HomeBtn from "./sub-nav-home";
import MobileMenu from "../nav/layout-nav-mobile-menu";
import useMoblieNavMenu from "@/hooks/commons/layout/useMoblieNavMenu";
import MoblieMenuBtn from "./sub-nav-moblie-menu-btn";

export default function SubNavMobileMenu() {
  const { isOpenMenu, toggleMenu, menuRef, isVisible } = useMoblieNavMenu();

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <nav className="z-30 md:hidden fixed bottom-0 w-full h-16 p-2 bg-white shadow-[0_-2px_4px_0_rgba(33,37,41,.08)]">
        <ul className="flex justify-evenly items-center h-full w-full">
          <li>
            <ChatBtn />
          </li>
          <li>
            <SellBtn />
          </li>
          <li>
            <HomeBtn />
          </li>
          <li>
            <ProductBtn />
          </li>
          <li>
            <MoblieMenuBtn isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} />
          </li>
        </ul>
      </nav>

      {isOpenMenu && <MobileMenu toggleMenu={toggleMenu} ref={menuRef} />}
    </>
  );
}
