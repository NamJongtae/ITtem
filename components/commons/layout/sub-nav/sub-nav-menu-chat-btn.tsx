import useNavChat from "@/hooks/commons/layout/useNavChat";
import ChatIcon from "@/public/icons/chat_icon.svg";

export default function SubNavMenuChatBtn() {
  const { pathname, totalMessageCount, handleClickChat } = useNavChat();

  return (
    <button
      onClick={handleClickChat}
      className={`relative inline-flex flex-col items-center gap-[2px] text-xs text-gary-600 ${
        totalMessageCount &&
        "before:absolute before:-right-[1px] before:-top-[2px] before:w-[8px] before:h-[8px] before:rounded-full before:bg-red-400"
      } ${pathname && pathname.includes("/chat") && "text-indigo-500"}`}
    >
      <ChatIcon
        className={`${
          pathname && pathname.includes("/chat")
            ? "fill-indigo-500"
            : "fill-black"
        } w-5 h-5`}
      />
      <span>채팅</span>
    </button>
  );
}
