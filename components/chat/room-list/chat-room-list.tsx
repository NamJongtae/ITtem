"use client";

import useChatRoomListLogic from "@/hooks/chat-room/useChatRoomListLogic";
import ChatRoomListItem from "./chat-room-list-item";
import Empty from "@/components/commons/empty";
import ChatRoomListSkeletonUI from "./chat-room-list-SkeletonUI";

export default function ChatRoomList() {
  const { chatRoomData, isLoading } = useChatRoomListLogic();
  const chatRoomList = Object.entries(chatRoomData);
  const isEmpty = chatRoomList.length === 0;

  if (isLoading) {
    return <ChatRoomListSkeletonUI />;
  }

  return (
    <>
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 max-h-[calc(100vh-301px)] md:max-h-[calc(100vh-237px)]">
        {isEmpty ? (
          <Empty message="채팅방 목록이 존재하지 않아요." />
        ) : (
          chatRoomList.map(([id, data]) => (
            <ChatRoomListItem key={id} data={{ ...data, id }} />
          ))
        )}
      </ul>
    </>
  );
}
