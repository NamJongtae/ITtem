import { usePathname, useRouter } from "next/navigation";
import useNotificationChat from "@/hooks/chat-room/useNotificationChat";
import useChatStore from "@/store/chat-store";

export default function useNavChat() {
  const router = useRouter();
  const pathname = usePathname();
  const totalMessageCount = useChatStore((state) => state.totalMessageCount);

  const handleClickChat = () => {
    router.push("/chat");
  };

  useNotificationChat();

  return { pathname, totalMessageCount, handleClickChat };
}
