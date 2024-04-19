import useDebouncing from "@/hooks/useDebouncing";
import ChatIcon from "@/public/icons/chat_icon.svg";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function NavChat() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);

  const debouncing = useDebouncing();

  const handleClickLink = debouncing((e: any) => {
    if (!user) {
      e.preventDefault();
      toast.warn("로그인 후 이용해주세요.");
    }
  }, 500);

  return (
    <Link
      onClick={handleClickLink}
      href={"/chat"}
      className={`relative inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
        true &&
        "before:absolute before:-right-[1px] before:-top-[2px] before:w-[8px] before:h-[8px] before:rounded-full before:bg-red-400"
      } ${pathname.includes("/chat") && "text-indigo-500"}`}
    >
      <ChatIcon
        className={`${
          pathname.includes("/chat") ? "fill-indigo-500" : "fill-black"
        } w-5 h-5`}
      />
      <span>채팅</span>
    </Link>
  );
}
