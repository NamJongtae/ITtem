import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useNotificationChat from "@/hooks/chat/useNotificationChat";

export default function useNavChat() {
  const router = useRouter();
  const pathname = router.pathname;
  const totalMessageCount = useSelector(
    (state: RootState) => state.chat.totalMessageCount
  );

  const handleClickChat = () => {
    router.push("/chat");
  };

  useNotificationChat();

  return { pathname, totalMessageCount, handleClickChat };
}
