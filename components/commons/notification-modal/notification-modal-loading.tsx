import React from "react";
import Spinner from "../spinner";

export default function NotificationModalLoading() {
  return (
    <div className="absolute center">
      <Spinner />
    </div>
  );
}
