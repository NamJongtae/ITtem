import { useRouter } from "next/router";

export default function useChatRoomHeader() {
  const router = useRouter();
  const onClickBack = () => {
    router.push("/chat");
  };

  return { onClickBack };
}
