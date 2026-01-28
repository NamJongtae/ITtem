"use client";

import dynamic from "next/dynamic";

const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => (
    <div className="w-28 h-4 mt-3 bg-gray-300/60 rounded animate-pulse" />
  )
});

export default function ReactStarClient({ starValue }: { starValue: number }) {
  return (
    <ReactStars
      size={20}
      half
      value={starValue}
      color1="#ddd"
      color2="#fec323"
      edit={false}
    />
  );
}
