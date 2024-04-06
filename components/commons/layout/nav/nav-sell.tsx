import SellIcon from "@/public/icons/money_icon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavSell() {
  const pathname = usePathname();

  return (
    <Link
      href={"/product/upload"}
      className={`inline-flex flex-col items-center gap-[2px] text-xs ${pathname==="/product/upload" && "text-indigo-500"}`}
    >
      <SellIcon
        className={`${
          pathname==="/product/upload" ? "fill-indigo-500" : "fill-black"
        } w-5 h-5`}
      />
      판매
    </Link>
  );
}
