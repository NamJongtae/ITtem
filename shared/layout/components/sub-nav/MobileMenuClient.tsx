"use client";

import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
  loading: () => (
    <div className="z-30 md:hidden fixed bottom-0 w-full h-16 p-2 bg-gray-200 shadow-[0_-2px_4px_0_rgba(33,37,41,.08)]" />
  )
});

export default function MobileMenuClient() {
  return <MobileMenu />;
}
