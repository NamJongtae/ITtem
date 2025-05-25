"use client";

import ChatBtn from "./ChatBtn";
import SellBtn from "./SellBtn";
import ProductBtn from "./ProductBtn";
import HomeBtn from "./HomeBtn";
import useVisible from "@/shared/common/hooks/useVisible";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import MobileMenuLogoutBtn from "./MobileMenuLoginoutBtn";
import MoblieMenuLoginBtn from "./MoblieMenuLoginBtn";

export default function MobileMenu() {
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
          <li>{isLogin ? <MobileMenuLogoutBtn /> : <MoblieMenuLoginBtn />}</li>
        </ul>
      </nav>
    </>
  );
}
