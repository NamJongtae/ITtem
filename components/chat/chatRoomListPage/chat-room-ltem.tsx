import useChatRoomItem from "@/hooks/chat/useChatRoomItem";
import { getChatRoomListDateFormat } from "@/lib/getDateFormate";
import { ChatRoomData } from "@/types/chatTypes";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  data: ChatRoomData & { id: string };
}

export default function ChatRoomItem({ data }: IProps) {
  const { myUid, profileData } = useChatRoomItem({
    senderId: data.lastMessage?.senderId,
  });

  return (
    <li>
      <Link
        href={`/chat/${data.id}`}
        data-count={
          data.newMessageCount[myUid] >= 999
            ? "999+"
            : data.newMessageCount[myUid]
        }
        className={`relative w-full text-left flex items-center gap-3 ${
          data.newMessageCount[myUid] > 0
            ? "before:absolute before:rounded-full before:bg-red-400 before:right-0 before:bottom-0 before:px-1 before:text-[11px] before:inline-flex before:items-center before:justify-center before:content-[attr(data-count)] before:text-white"
            : ""
        }`}
      >
        {profileData ? (
          <Image
            className="rounded-xl w-10 h-10 object-cover object-center"
            src={profileData?.profileImg || ""}
            alt={profileData?.nickname || ""}
            width={40}
            height={40}
          />
        ) : (
          <div className="w-[40px] h-[40px]">
            <span className="sr-only">loading</span>
          </div>
        )}

        <div className="w-full">
          <div className="mb-1 flex justify-between items-center">
            <span className="font-semibold text-sm">
              {profileData?.nickname}
            </span>
            <time
              dateTime={data.lastMessage?.timestamp
                .toDate()
                .toLocaleDateString()}
              className="text-[10px] text-gray-400"
            >
              {getChatRoomListDateFormat(
                data.lastMessage?.timestamp.toDate() || new Date()
              )}
            </time>
          </div>
          <p className="text-xs text-gray-400">{data.lastMessage?.content}</p>
        </div>
      </Link>
    </li>
  );
}
