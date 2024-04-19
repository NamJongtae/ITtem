import useDebouncing from "@/hooks/useDebouncing";
import SellIcon from "@/public/icons/money_icon.svg";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function NavSell() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);

  const debouncing = useDebouncing();

  const handleClickLink = debouncing((e: any) => {
    if (!user) {
      e.preventDefault();
      toast.warn("로그인 후 이용해주세요.");
    }
  }, 300);

  return (
    <Link
      onClick={handleClickLink}
      href={"/product/upload"}
      className={`inline-flex flex-col items-center gap-[2px] text-xs ${
        pathname === "/product/upload" && "text-indigo-500"
      }`}
    >
      <SellIcon
        className={`${
          pathname === "/product/upload" ? "fill-indigo-500" : "fill-black"
        } w-5 h-5`}
      />
      판매
    </Link>
  );
}
