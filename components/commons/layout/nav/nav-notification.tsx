import NotificatonIcon from "@/public/icons/notification_icon.svg";
import { useState } from "react";

export default function NavNotification() {
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const toggleNotification = () => {
    setIsOpenNotification((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleNotification}
        className={`relative inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
          true &&
          "before:absolute before:right-[2px] before:top-[0px] before:w-[8px] before:h-[8px] before:rounded-full before:bg-red-400"
        } ${isOpenNotification && "text-indigo-500"}`}
        type="button"
      >
        <NotificatonIcon
          className={`w-6 h-6 md:w-5 md:h-5 ${
            isOpenNotification ? "stroke-indigo-500" : "stroke-black"
          }`}
        />
        <span className="hidden md:inline">알림</span>
      </button>
    </>
  );
}
