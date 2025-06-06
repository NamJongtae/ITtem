import ChatRoomPage from '@/domains/chat/room/components/ChatRoomPage';
import { BASE_URL } from "@/shared/common/constants/constant";

export async function generateMetadata({
  params
}: {
  params: Promise<{ chatRoomId: string | undefined }>;
}) {
  const { chatRoomId } = await params;
  const url = `${BASE_URL}/chat/${chatRoomId}`;
  const title = "ITtem | 채팅";

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default function ChatRoom() {
  return <ChatRoomPage />;
}
