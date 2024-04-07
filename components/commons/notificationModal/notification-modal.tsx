import React, { forwardRef } from "react";
import NotificationList from "./notification-list";
import NotificationBtn from "./notification-btn";
import NotificationHeader from "./notification-header";

const NotificationModal = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="absolute z-30 w-[300px] h-[427px] bg-white border border-gray-300 rounded-md top-12 -right-3 md:top-16 sm:-right-7 animate-entering"
      ref={ref}
    >
      <NotificationHeader />
      <NotificationBtn />
      <NotificationList />
    </div>
  );
});

NotificationModal.displayName = "NotificationModal";

export default NotificationModal;
