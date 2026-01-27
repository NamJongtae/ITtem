"use client";

import dynamic from "next/dynamic";

const SubNav = dynamic(() => import("./SubNav"), {
  ssr: false,
  loading: () => (
    <div className="relative flex justify-between px-4 sm:px-8 pb-4 max-w-[1024px] mx-auto">
      <div className="flex gap-3 items-center">
        <div className="bg-gray-200 w-6 h-6 rounded animate-pulse" />
      </div>
      <div className={"relative flex gap-3 animate-pulse"}>
        <div className="w-[22px] h-[38px] bg-gray-200 rounded" />
        <div className="hidden md:flex gap-3">
          {[...new Array(3)].map((_, i) => (
            <div key={i} className="w-[22px] h-[38px] bg-gray-200 round" />
          ))}
        </div>
      </div>
    </div>
  )
});

export default function SubNavClient() {
  return <SubNav />;
}
