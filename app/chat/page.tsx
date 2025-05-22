import ChatRoomListPage from "@/domains/chat/components/room-list/chat-room-list-page";
import { BASE_URL } from "@/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/chat`),
  title: "ITtem | 채팅목록",
  openGraph: {
    url: `${BASE_URL}/chat`,
    title: "ITtem | 채팅목록"
  }
};

export default function ChatRoomList() {
  return <ChatRoomListPage />;
}
