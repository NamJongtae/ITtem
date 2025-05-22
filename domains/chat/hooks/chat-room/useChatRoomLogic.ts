import { useRef, useState } from "react";
import { ChatMessageData, ChatRoomData } from "../../types/chat-types";

import useChatRoomSubscription from "./useChatRoomSubscription";

export default function useChatRoomLogic() {
  const [isExit, setIsExit] = useState(false);
  const [chatData, setChatData] = useState<ChatRoomData | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChatRoomExit = () => {
    setIsExit(true);
  };

  const resetChatRoomExit = () => {
    setIsExit(false);
  };

  const chatListRef = useRef<HTMLUListElement | null>(null);

  useChatRoomSubscription({ isExit, setChatData, setMessages, setIsLoading });

  return {
    chatData,
    messages,
    isLoading,
    handleChatRoomExit,
    resetChatRoomExit,
    chatListRef
  };
}
