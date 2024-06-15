import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useDebouncing from "../useDebouncing";
import { toast } from "react-toastify";
import useNotificationChat from "@/hooks/chat/useNotificationChat";

export default function useNavChat() {
  const router = useRouter();
  const pathname = router.pathname;
  const user = useSelector((state: RootState) => state.auth.user);
  const totalMessageCount = useSelector(
    (state: RootState) => state.chat.totalMessageCount
  );

  const debouncing = useDebouncing();

  const handleClickLink = debouncing((e: any) => {
    if (!user) {
      e.preventDefault();
      toast.warn("로그인 후 이용해주세요.");
    }
  }, 500);

  useNotificationChat();

  return { handleClickLink, pathname, totalMessageCount };
}
