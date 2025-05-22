"use client";

import TopBtn from "./top-btn/top-btn";
import useVisible from "@/hooks/useVisible";
import RecentProduct from "./recent-product/recent-product";

export default function LayoutSideMenu() {
  const { isVisible } = useVisible({ pathnames: ["chat", "signup", "signin"] });

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="fixed bottom-32 right-3 z-10">
      <RecentProduct />
      <TopBtn />
    </aside>
  );
}
