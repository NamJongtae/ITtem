"use client";

import NotificatonIcon from "@/public/icons/notification-icon.svg";
import Modal from "@/domains/notification/components/Modal";
import useNotification from "@/shared/layout/hooks/useNotification";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

export default function NotificationBtn() {
  const { isOpenModal, toggleNotification, notificationRef, unreadCount } =
    useNotification();

  return (
    <>
      <button
        onClick={toggleNotification}
        className={`relative inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
          unreadCount !== 0 &&
          "before:absolute before:right-[2px] before:-top-[1px] before:w-[8px] before:h-[8px] before:rounded-full before:bg-red-400"
        } ${isOpenModal && "text-indigo-500"}`}
        type="button"
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: toggleNotification })
        }
        aria-label="알림"
      >
        <NotificatonIcon
          className={`w-6 h-6 md:w-5 md:h-5 ${
            isOpenModal ? "stroke-indigo-500" : "stroke-black"
          }`}
        />
        <span className="hidden md:inline">알림</span>
      </button>
      {isOpenModal && (
        <Modal
          ref={notificationRef}
          isOpenModal={isOpenModal}
          toggleNotification={toggleNotification}
        />
      )}
    </>
  );
}
