"use client";

import MenuChatBtn from "./ChatBtn";
import MenuProductBtn from "./ProductBtn";
import MenuSellBtn from "./SellBtn";
import dynamic from "next/dynamic";
import NotificatonIcon from "@/public/icons/notification-icon.svg";

const NotificationBtn = dynamic(
  () => import("@/shared/layout/components/sub-nav/NotificationBtn"),
  {
    ssr: false,
    loading: () => (
      <div className="inline-flex flex-col items-center gap-[2px] text-xs text-gary-600">
        <NotificatonIcon className={"w-6 h-6 md:w-5 md:h-5 stroke-black"} />
        <span className="hidden md:inline">알림</span>
      </div>
    )
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
