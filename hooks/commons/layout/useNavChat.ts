import { RootState } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useNotificationChat from "@/hooks/chat-room/useNotificationChat";

export default function useNavChat() {
  const router = useRouter();
  const pathname = usePathname();
  const totalMessageCount = useSelector(
    (state: RootState) => state.chat.totalMessageCount
  );

  const handleClickChat = () => {
    router.push("/chat");
  };

  useNotificationChat();

  return { pathname, totalMessageCount, handleClickChat };
}
