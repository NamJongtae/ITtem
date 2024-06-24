import ChatRoomListPage from "@/components/chat/chatRoomListPage/chat-room-list-page";
import MetaHead from "@/components/metaHead/meta-head";
import { getMetaDataURL } from "@/lib/getMetaData";

export default function ChatRooms() {
  return (
    <>
      <MetaHead title="채팅목록" url={getMetaDataURL("chat")} />
      <ChatRoomListPage />
    </>
  );
}
