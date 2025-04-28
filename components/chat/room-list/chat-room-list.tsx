"use client";

import useChatRoomList from "@/hooks/chat-room/useChatRoomList";
import ChatRoomListItem from "./chat-room-list-item";
import Empty from "@/components/commons/empty";
import ChatRoomListSkeletonUI from "./chat-room-list-SkeletonUI";

export default function ChatRoomList() {
  const { chatRoomData, isLoading } = useChatRoomList();

  if (isLoading) {
    return <ChatRoomListSkeletonUI />;
  }

  return (
    <>
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 max-h-[calc(100vh-301px)] md:max-h-[calc(100vh-237px)]">
        {Object.entries(chatRoomData).length === 0 && !isLoading ? (
          <Empty message="채팅방 목록이 존재하지 않아요." />
        ) : (
          Object.entries(chatRoomData).map(([id, data]) => (
            <ChatRoomListItem key={id} data={{ ...data, id }} />
          ))
        )}
      </ul>
    </>
  );
}
