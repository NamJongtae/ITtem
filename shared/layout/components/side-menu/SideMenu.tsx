"use client";

import TopBtn from "./top-btn/TopBtn";
import useVisible from "@/shared/common/hooks/useVisible";
const RecentProduct = dynamic(() => import("./recent-product/RecentProduct"), {
  ssr: false
});

import dynamic from "next/dynamic";

export default function SideMenu() {
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
