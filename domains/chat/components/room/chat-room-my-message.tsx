import { getChattingDateFormat } from "@/utils/getDateFormate";
import { ChatMessageData } from "../../types/chat-types";

interface IProps {
  message: ChatMessageData & { id: string };
}

export default function ChatRoomMyMessage({ message }: IProps) {
  return (
    <li
      key={message.id}
      className="max-w-[80%] self-end flex items-center gap-3"
    >
      <div className="flex items-end flex-row-reverse gap-2">
        <p className="text-sm border py-1 px-3 rounded-lg rounded-tr-none bg-gray-200 text-black whitespace-pre-wrap">
          {message.content}
        </p>
        <time className="text-[10px] text-gray-400 shrink-0">
          {getChattingDateFormat(message.timestamp.toDate())}
        </time>
      </div>
    </li>
  );
}
