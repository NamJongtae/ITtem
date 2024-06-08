import useChatRoomList from "@/hooks/chat/useChatRoomList";
import ChatRoomItem from "./chat-room-ltem";
import Loading from "@/components/commons/loading";
import Empty from "@/components/commons/Empty";

export default function ChatRoomList() {
  const { chatRoomData, isLoading } = useChatRoomList();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="px-5 py-3 font-semibold text-lg">채팅</h2>
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 max-h-[calc(100vh-301px)] md:max-h-[calc(100vh-237px)]">
        {Object.entries(chatRoomData).length === 0 && !isLoading ? (
          <Empty message="채팅방 목록이 존재하지 않아요." />
        ) : (
          Object.entries(chatRoomData).map(([id, data]) => (
            <ChatRoomItem key={id} data={{ ...data, id }} />
          ))
        )}
      </ul>
    </div>
  );
}
