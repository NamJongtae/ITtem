import useDeleteAllNotificationMessage from "@/domains/notification/hooks/useDeleteAllNotificationMessage";
import { NotificationMessageData } from "@/domains/notification/types/notification-types";

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
