import useVerifyEmailCounter from "@/hooks/signup/useVerifyEmailCounter";
import React from "react";

export default function VerfiyCodeCounter() {
  const { counter } = useVerifyEmailCounter();
  return (
    <span
      className={`${
        counter <= 10 && "text-red-400"
      } text-sm mr-2 text-gray-400`}
    >
      {String(Math.floor(counter / 60)).padStart(2, "0")}:
      {String(counter % 60).padStart(2, "0")}
    </span>
  );
}
