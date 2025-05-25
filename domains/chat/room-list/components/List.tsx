"use client";

import useChatRoomListLogic from "../../room/hooks/useChatRoomListLogic";
import Item from "./Item";
import Empty from "@/shared/common/components/empty";
import SkeletonUI from "./SkeletonUI";

export default function List() {
  const { chatRoomData, isLoading } = useChatRoomListLogic();
  const chatRoomList = Object.entries(chatRoomData);
  const isEmpty = chatRoomList.length === 0;

  if (isLoading) {
    return <SkeletonUI />;
  }

  return (
    <>
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 max-h-[calc(100vh-301px)] md:max-h-[calc(100vh-237px)]">
        {isEmpty ? (
          <Empty message="채팅방 목록이 존재하지 않아요." />
        ) : (
          chatRoomList.map(([id, data]) => (
            <Item key={id} data={{ ...data, id }} />
          ))
        )}
      </ul>
    </>
  );
}
