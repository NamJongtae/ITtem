import { useCustomRouter } from "@/hooks/useCustomRouter";
import Image from "next/image";

export default function SubNavMoblieMenuLoginBtn() {
  const { navigate } = useCustomRouter();

  return (
    <button
      className={
        "inline-flex flex-col items-center gap-[2px] text-xs text-gary-600"
      }
      onClick={() => navigate({ type: "push", url: "/signin" })}
    >
      <Image src={"/icons/user-icon.svg"} alt="logout" width={20} height={20} />
      로그인
    </button>
  );
}
