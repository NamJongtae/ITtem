import { getChattingDateFormat } from '@/lib/getDateFormate';
import { ChatMessageData } from "@/types/chatTypes";

interface IProps {
  message: ChatMessageData  & { id: string };
}

export default function ChatRoomMyMessage({ message }: IProps) {
  return (
    <li key={message.id} className="self-end flex items-center gap-3">
      <div className="flex items-end flex-row-reverse gap-2">
        <p className="text-sm border py-1 px-3 rounded-lg rounded-tr-none bg-gray-200 text-black">
          {message.content}
        </p>
        <time className="text-[10px] text-gray-400">
          {getChattingDateFormat(message.timestamp.toDate())}
        </time>
      </div>
    </li>
  );
}
