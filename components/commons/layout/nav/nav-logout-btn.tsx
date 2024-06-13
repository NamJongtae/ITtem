import useSignoutMutate from "@/hooks/reactQuery/mutations/auth/useSignoutMutate";
import Image from "next/image";
import React from "react";

export default function NavLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();

  const handleClickLogout = () => {
    signoutMutate(undefined);
  };

  return (
    <button
      onClick={handleClickLogout}
      className="pb-1 hidden md:block underline-offset-2 betterhover:hover:underline"
    >
      <Image
        className="inline mr-1"
        src={"/icons/logout_icon.svg"}
        alt="logout"
        width={20}
        height={20}
      />
      로그아웃
    </button>
  );
}
