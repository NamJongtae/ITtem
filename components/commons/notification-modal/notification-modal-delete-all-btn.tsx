import useDeleteAllNotificationMessage from "@/hooks/commons/notification-modal/useDeleteAllNotificationMessage";
import { NotificationMessageData } from "@/types/notification-types";

interface IProps {
  messageData: NotificationMessageData[] | undefined;
  lastMessageKey: string;
}

export default function NotificationModalDeleteAllBtn({
  messageData,
  lastMessageKey
}: IProps) {
  const { onClickDeleteAll } = useDeleteAllNotificationMessage({
    messageData,
    lastMessageKey
  });

  return (
    <button
      type="button"
      onClick={onClickDeleteAll}
      className="text-[11px] betterhover:hover:underline"
    >
      모두 삭제
    </button>
  );
}
