import ChatRoomHeader from "./chat-room-header";
import ChatRoomMessage from "./chat-room-message-list";
import ChatRoomForm from "./chat-room-form";
import Loading from "@/components/commons/loading";
import useChatRoom from "@/hooks/chat/useChatRoom";
import { useRef } from "react";

export default function ChatRoomPage() {
  const { chatData, messages, isLoading } = useChatRoom();
  const chatListRef = useRef<HTMLUListElement | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !chatData) {
    return null;
  }

  return (
    <div className="relative z-0 w-full max-w-[calc(1024px-32px)] md:max-w-[calc(1024px-64px)] mx-auto h-[calc(100vh-176px-53px)] md:h-[calc(100vh-126px-53px)] border-0 md:border-l md:border-r">
      <ChatRoomHeader productId={chatData!.productId} />
      <ChatRoomMessage messages={messages} chatListRef={chatListRef} />
      <ChatRoomForm chatListRef={chatListRef}/>
    </div>
  );
}
