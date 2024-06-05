import ChatRoomList from "./chat-room-list/chat-room-list";

export default function ChatRoomListPage() {
  return (
    <div className="w-full max-w-[calc(1024px-32px)] md:max-w-[calc(1024px-64px)] mx-auto h-[calc(100vh-176px-53px)] md:h-[calc(100vh-126px-53px)] border-0 md:border-l md:border-r">
      <ChatRoomList />
    </div>
  );
}
