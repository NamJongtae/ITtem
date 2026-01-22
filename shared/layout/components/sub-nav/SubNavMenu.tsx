"use client";

import MenuProductBtn from "./ProductBtn";
import MenuSellBtn from "./SellBtn";
import dynamic from "next/dynamic";
import NotificatonIcon from "@/public/icons/notification-icon.svg";
import ChatIcon from "@/public/icons/chat-icon.svg";

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

const MenuChatBtn = dynamic(() => import("./ChatBtn"), {
  ssr: false,
  loading: () => (
    <div
      className={
        "inline-flex flex-col items-center gap-[2px] text-xs text-gary-600"
      }
    >
      <ChatIcon className="fill-black w-5 h-5" />
      <span>채팅</span>
    </div>
  )
});

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
