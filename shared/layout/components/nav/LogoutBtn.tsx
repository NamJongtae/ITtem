"use client";

import useLogoutBtn from "@/shared/layout/hooks/useLogoutBtn";
import Image from "next/image";

export default function LogoutBtn() {
  const { handleClickLogout } = useLogoutBtn();

  return (
    <button
      onClick={handleClickLogout}
      className="pb-1 hidden md:block underline-offset-2 betterhover:hover:underline"
    >
      <Image
        className="inline mr-1"
        src={"/icons/logout-icon.svg"}
        alt="logout"
        width={20}
        height={20}
      />
      로그아웃
    </button>
  );
}
