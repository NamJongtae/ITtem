import useChatRoomList from "@/hooks/chat/useChatRoomList";
import ChatRoomItem from "./chat-room-ltem";

export default function ChatRoomList() {
  const { chatRoomData } = useChatRoomList();

  return (
    <div>
      <h2 className="px-5 py-3 font-semibold text-lg">채팅</h2>
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 max-h-[calc(100vh-237px)] md:max-h-[calc(100vh-301px)]">
        {Object.entries(chatRoomData).map(([id, data]) => (
          <ChatRoomItem key={id} data={{ ...data, id }} />
        ))}
      </ul>
    </div>
  );
}
