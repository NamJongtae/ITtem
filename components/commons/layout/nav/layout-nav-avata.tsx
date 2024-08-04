"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function LayoutNavAvata() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Link className="relative inline-block" href="/profile">
      <Image
        src={user?.profileImg || "/icons/user_icon.svg"}
        className="border-2 border-gray-300 inline-block h-9 w-9 cursor-pointer rounded-full object-cover object-center"
        width={36}
        height={36}
        alt={user?.nickname || ""}
      />
      <p className="relative hidden lg:inline">
        <span className="font-semibold ml-2">{user?.nickname}</span> 님
      </p>
    </Link>
  );
}
