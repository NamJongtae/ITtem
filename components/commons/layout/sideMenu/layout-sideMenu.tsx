"use client";

import SideMenuTopBtn from "./top-btn/sideMenu-top-btn";
import useVisible from "@/hooks/commons/useVisible";
import SideMenuRecentProduct from './recent-product/sideMenu-recentProduct';

export default function SideMenu() {
  const { isVisible } = useVisible({ pathnames: ["chat", "signup", "signin"] });
  
  if (!isVisible) {
    return null;
  }

  return (
    <aside className="fixed bottom-32 right-3 z-10">
      <SideMenuRecentProduct />
      <SideMenuTopBtn />
    </aside>
  );
}
