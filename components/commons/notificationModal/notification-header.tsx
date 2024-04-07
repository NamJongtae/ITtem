import React from "react";

export default function NotificationHeader() {
  return (
    <div className="flex justify-between items-end border-b border-gray-200 px-5 pt-3 pb-2">
      <h2 className="font-bold">알림</h2>
      <p className="text-xs text-gray-500">최근 30일간 메세지만 기록</p>
    </div>
  );
}
