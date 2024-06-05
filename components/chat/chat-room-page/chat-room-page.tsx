import ChatRoomHeader from "./chat-room-header";
import ChatRoomMessage from "./chat-room-message";
import ChatRoomForm from "./chat-room-form";

export default function ChatRoomPage() {
  return (
    <div className="relative w-full max-w-[calc(1024px-32px)] md:max-w-[calc(1024px-64px)] mx-auto h-[calc(100vh-176px-53px)] md:h-[calc(100vh-126px-53px)] border-0 md:border-l md:border-r">
      <ChatRoomHeader />
      <ChatRoomMessage />
      <ChatRoomForm />
    </div>
  );
}
