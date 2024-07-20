import { useRouter } from "next/navigation";

export default function useChatRoomHeader() {
  const router = useRouter();
  const onClickBack = () => {
    router.push("/chat");
  };

  return { onClickBack };
}
