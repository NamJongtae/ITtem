import React from "react";
import NotificationBtn from './notification-btn';

export default function NotificationHeader() {
  return (
    <div className="flex justify-between items-end border-b border-gray-200 px-5 pt-3 pb-2">
      <h2 className="font-bold">알림</h2>
      <NotificationBtn />
    </div>
  );
}
