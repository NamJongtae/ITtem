import { RootState } from "@/store/store";
import { ChatMessageData } from "@/types/chatTypes";
import { useSelector } from "react-redux";
import ChatRoomMyMessage from "./chat-room-my-message";
import ChatRoomUserMessage from "./chat-room-user-message";
import { MutableRefObject } from "react";

interface IProps {
  messages: ChatMessageData[];
  chatListRef: MutableRefObject<HTMLUListElement | null>;
}

export default function ChatRoomMessageList({ messages, chatListRef }: IProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;

  return (
    <ul
      className="flex flex-col gap-5 overflow-y-auto w-full max-h-[calc(100vh-288px)] p-5"
      ref={chatListRef}
    >
      {Object.entries(messages).map(([id, message]) =>
        message.senderId === myUid ? (
          <ChatRoomMyMessage key={id} message={{ ...message, id }} />
        ) : (
          <ChatRoomUserMessage key={id} message={{ ...message, id }} />
        )
      )}
    </ul>
  );
}
