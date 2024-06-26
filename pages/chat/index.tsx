import ChatRoomListPage from "@/components/chat/chatRoomListPage/chat-room-list-page";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";

export default function ChatRooms() {
  return (
    <>
      <DynamicMetaHead title="채팅목록" url={getDynamicMetaDataURL("chat")} />
      <ChatRoomListPage />
    </>
  );
}
