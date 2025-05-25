import useProfileQuery from "@/domains/user/profile/hooks/queries/useProfileQuery";
import { getChattingDateFormat } from "@/shared/common/utils/getDateFormate";
import { ChatMessageData } from "../types/chatRoomTypes";
import Image from "next/image";

interface IProps {
  message: ChatMessageData & { id: string };
}

export default function OtherUserMessage({ message }: IProps) {
  const { profileData } = useProfileQuery(message.senderId);

  return (
    <li key={message.id} className="max-w-[80%] flex items-center gap-3">
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
          <p className="text-sm border py-1 px-3 rounded-lg rounded-tl-none bg-blue-600 text-white break-words">
            {message.content}
          </p>
          <time className="text-[10px] text-gray-400 shrink-0">
            {getChattingDateFormat(message.timestamp.toDate())}
          </time>
        </div>
      </div>
    </li>
  );
}
