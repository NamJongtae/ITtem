import ChatRoomPage from "@/components/chat/chatRoomPage/chat-room-page";
import { BASE_URL } from '@/constants/constant';

export async function generateMetadata({
  params,
}: {
  params: { chatRoomId: string | undefined };
}) {
  const url = `${BASE_URL}/chat/${params.chatRoomId}`;
  const title = "ITtem | 채팅";

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title,
    },
  };
}

export default function ChatRoom() {
  return <ChatRoomPage />;
}
