"use client";

import Header from "./Header";
import MessageList from "./MessageList";
import Form from "./Form";
import useChatRoomLogic from "../hooks/useChatRoomLogic";
import ChatRoomLoading from "@/app/chat/[chatRoomId]/loading";

export default function ChatRoomPage() {
  const {
    chatData,
    messages,
    isLoading,
    handleChatRoomExit,
    resetChatRoomExit,
    chatListRef
  } = useChatRoomLogic();

  if (isLoading) {
    return <ChatRoomLoading />;
  }

  if (!isLoading && !chatData) {
    return null;
  }

  return (
    chatData && (
      <div className="relative z-0 w-full max-w-[calc(1024px-32px)] md:max-w-[calc(1024px-64px)] mx-auto h-[calc(100vh-176px-53px)] md:h-[calc(100vh-126px-53px)] border-0 md:border-l md:border-r overflow-hidden">
        <Header
          productId={chatData.productId}
          participantIDs={chatData.participantIDs}
          handleChatRoomExit={handleChatRoomExit}
          resetChatRoomExit={resetChatRoomExit}
        />
        <MessageList messages={messages} chatListRef={chatListRef} />
        <Form chatListRef={chatListRef} />
      </div>
    )
  );
}
