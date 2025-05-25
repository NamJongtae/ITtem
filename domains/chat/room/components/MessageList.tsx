import { ChatMessageData } from "../types/chatRoomTypes";
import ChatRoomMyMessage from "./MyMessage";
import ChatRoomUserMessage from "./OtherUserMessage";
import { RefObject } from "react";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

interface IProps {
  messages: ChatMessageData[];
  chatListRef: RefObject<HTMLUListElement | null>;
}

export default function MessageList({ messages, chatListRef }: IProps) {
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;
  const messageData = Object.entries(messages);

  return (
    <ul
      className="flex flex-col gap-5 overflow-y-auto w-full max-h-[calc(100vh-288px)] p-5"
      ref={chatListRef}
    >
      {messageData.map(([id, message]) =>
        message.senderId === myUid ? (
          <ChatRoomMyMessage key={id} message={{ ...message, id }} />
        ) : (
          <ChatRoomUserMessage key={id} message={{ ...message, id }} />
        )
      )}
    </ul>
  );
}
