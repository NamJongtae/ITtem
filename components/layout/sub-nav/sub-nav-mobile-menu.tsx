"use client";

import ChatBtn from "./sub-nav-menu-chat-btn";
import SellBtn from "./sub-nav-menu-sell-btn";
import ProductBtn from "./sub-nav-menu-product-btn";
import HomeBtn from "./sub-nav-home";
import useVisible from "@/hooks/useVisible";
import useAuthStore from "@/domains/auth/store/auth-store";
import SubNavMobileMenuLogoutBtn from "./sub-nav-mobile-menu-loginout-btn";
import SubNavMoblieMenuLoginBtn from "./sub-nav-moblie-menu-login-btn";

export default function SubNavMobileMenu() {
  const { user } = useAuthStore();
  const isLogin = user?.uid;
  const { isVisible } = useVisible({
    pathnames: ["signup", "signin", "findpassword"]
  });

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
            {isLogin ? (
              <SubNavMobileMenuLogoutBtn />
            ) : (
              <SubNavMoblieMenuLoginBtn />
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
