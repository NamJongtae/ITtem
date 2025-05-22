import useSignoutMutate from "@/domains/auth/hooks/signout/useSignoutMutate";
import Image from "next/image";

export default function SubNavMobileMenuLogoutBtn() {
  const { signoutMutate } = useSignoutMutate();

  return (
    <button
      className={
        "inline-flex flex-col items-center gap-[2px] text-xs text-gary-600"
      }
      onClick={() => signoutMutate()}
    >
      <Image
        src={"/icons/logout-icon.svg"}
        alt="logout"
        width={20}
        height={20}
      />
      로그아웃
    </button>
  );
}
