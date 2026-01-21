"use client";

import MenuChatBtn from "./ChatBtn";
import MenuProductBtn from "./ProductBtn";
import MenuSellBtn from "./SellBtn";
import dynamic from "next/dynamic";

const NotificationBtn = dynamic(
  () => import("@/shared/layout/components/sub-nav/NotificationBtn"),
  {
    ssr: false
  }
);

export default function SubNavMenu() {
  return (
    <div className={"relative flex gap-3"}>
      <NotificationBtn />
      <div className="hidden md:flex gap-3">
        <MenuChatBtn />
        <MenuSellBtn />
        <MenuProductBtn />
      </div>
    </div>
  );
}
