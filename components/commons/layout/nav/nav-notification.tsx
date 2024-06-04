import NotificatonIcon from "@/public/icons/notification_icon.svg";
import NotificationModal from "../../notificationModal/notification-modal";
import useNotification from "@/hooks/layout/useNotification";

export default function NavNotification() {
  const {
    isOpenNotification,
    toggleNotification,
    notificationRef,
    unreadCount,
  } = useNotification();

  return (
    <>
      <button
        onClick={toggleNotification}
        className={`relative inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
          unreadCount !==0 &&
          "before:absolute before:right-[2px] before:-top-[1px] before:w-[8px] before:h-[8px] before:rounded-full before:bg-red-400"
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
      {isOpenNotification && <NotificationModal ref={notificationRef} />}
    </>
  );
}
