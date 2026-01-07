"use client";

import Link from "next/link";
import Image from "next/image";
import { AuthData } from "@/domains/auth/shared/common/types/authTypes";

export default function LayoutNavAvata({ user }: { user: AuthData | null }) {
  return (
    <Link className="relative inline-block" href="/profile">
      <Image
        src={user?.profileImg || "/icons/user-icon.svg"}
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
