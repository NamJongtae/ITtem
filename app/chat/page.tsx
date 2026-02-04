import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";
import ChatRoomListPage from "@/domains/chat/room-list/components/ChatRoomListPage";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...BASE_METADATA,
  metadataBase: new URL(`${BASE_URL}/chat`),
  title: "ITtem | 채팅목록",
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${BASE_URL}/chat`,
    title: "ITtem | 채팅목록"
  }
};

export default function ChatRoomList() {
  return <ChatRoomListPage />;
}
