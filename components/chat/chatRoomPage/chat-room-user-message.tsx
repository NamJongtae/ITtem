import useProfileQuery from "@/hooks/querys/useProfileQuery";
import { getChatDateFormat } from "@/lib/getDateFormate";
import { ChatMessageData } from "@/types/chatTypes";
import Image from "next/image";

interface IProps {
  message: ChatMessageData & { id: string };
}

export default function ChatRoomUserMessage({ message }: IProps) {
  const { profileData } = useProfileQuery(message.senderId);

  return (
    <li key={message.id} className="flex items-center gap-3">
      {profileData?.profileImg ? (
        <Image
          className="rounded-xl self-start w-10 h-10 object-cover object-center"
          src={profileData?.profileImg || ""}
          alt={profileData?.nickname || ""}
          width={40}
          height={40}
        />
      ) : (
        <div className="rounded-xl self-start w-[40px] h-[40px]">
          <span className="sr-only">loading</span>
        </div>
      )}

      <div>
        <span className="text-md font-semibold">{profileData?.nickname}</span>
        <div className="flex items-end gap-2">
          <p className="max-w-[170px] text-sm border py-1 px-3 rounded-lg rounded-tl-none bg-blue-600 text-white break-words">
            {message.content}
          </p>
          <time className="text-[10px] text-gray-400">
            {getChatDateFormat(message.timestamp.toDate())}
          </time>
        </div>
      </div>
    </li>
  );
}
