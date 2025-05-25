import { usePathname, useRouter } from "next/navigation";
import useUserChatInfoSubscription from "./useUserChatInfoSubscription";
import useChatStore from "@/domains/chat/shared/store/chatStore";

export default function useNavChat() {
  const router = useRouter();
  const pathname = usePathname();
  const totalMessageCount = useChatStore((state) => state.totalMessageCount);

  const handleClickChat = () => {
    router.push("/chat");
  };

  useUserChatInfoSubscription();

  return { pathname, totalMessageCount, handleClickChat };
}
