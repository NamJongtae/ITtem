import useVerifyEmailCounter from '@/hooks/useVerifyEmailCounter';
import React from "react";

export default function VerfiyCodeCounter() {
  const { counter } = useVerifyEmailCounter();
  return (
    <span className="text-sm mr-2 text-gray-400">
      {String(Math.floor(counter / 60)).padStart(2, "0")}:
      {String(counter % 60).padStart(2, "0")}
    </span>
  );
}
