import useReadAllNofiticationMessage from "@/hooks/commons/notification-modal/useReadAllNofiticationMessage";
import { NotificationMessageData } from "@/types/notification-types";

interface IProps {
  messageData: NotificationMessageData[] | undefined;
  lastMessageKey: string;
}
export default function NotificationModalReadAllBtn({
  messageData,
  lastMessageKey
}: IProps) {
  const { onClickReadAll } = useReadAllNofiticationMessage({
    messageData,
    lastMessageKey
  });

  return (
    <button
      type="button"
      onClick={onClickReadAll}
      className="relative text-[11px] before:bg-gray-400 before:absolute before:h-[11px] before:w-[1px] before:-right-[5px] before:top-1 betterhover:hover:underline"
    >
      모두 읽음
    </button>
  );
}
