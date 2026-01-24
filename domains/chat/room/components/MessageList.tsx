import { ChatMessageData } from "../types/chatRoomTypes";
import ChatRoomMyMessage from "./MyMessage";
import ChatRoomUserMessage from "./OtherUserMessage";
import { RefObject, useMemo } from "react";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useListVirtualizer from "@/shared/common/hooks/useListVirtualizer";

interface IProps {
  messages: ChatMessageData[];
  chatListRef: RefObject<HTMLUListElement | null>;
}

export default function MessageList({ messages, chatListRef }: IProps) {
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;

  const items = useMemo(() => Object.entries(messages), [messages]);

  const { virtualizer, virtualItems, totalSize, getRowStyle } =
    useListVirtualizer<[string, ChatMessageData], HTMLUListElement>({
      items,
      estimateSize: 80,
      overscan: 6,
      gap: 20,
      scrollMargin: 65,
      scrollRef: chatListRef
    });

  return (
    <ul
      ref={chatListRef}
      className="overflow-y-auto w-full max-h-[calc(100vh-288px)] p-5"
      style={{ position: "relative" }}
    >
      <li
        aria-hidden="true"
        style={{ height: totalSize, position: "relative" }}
      >
        {virtualItems.map((v) => {
          const [id, message] = items[v.index];
          const isMe = message.senderId === myUid;

          return (
            <div
              key={id}
              className={`absolute top-0 left-0 w-full flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
              data-index={v.index}
              ref={virtualizer.measureElement}
              style={getRowStyle(v.start)}
            >
              {isMe ? (
                <ChatRoomMyMessage message={{ ...message, id }} />
              ) : (
                <ChatRoomUserMessage message={{ ...message, id }} />
              )}
            </div>
          );
        })}
      </li>
    </ul>
  );
}
