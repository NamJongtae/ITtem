"use client";

import Link from "next/link";
import React from "react";
import HomeIcon from "@/public/icons/home-icon.svg";
import { usePathname } from "next/navigation";

export default function SubNavHome() {
  const pathname = usePathname();

  return (
    <Link
      href={"/"}
      className={`${
        pathname === "/" && "text-indigo-500"
      } flex flex-col items-center gap-[2px] text-sm text-gray-600`}
    >
      <HomeIcon
        className={`${
          pathname === "/" ? "stroke-indigo-500" : "stroke-black"
        } w-5 h-5`}
      />
      홈
    </Link>
  );
}
