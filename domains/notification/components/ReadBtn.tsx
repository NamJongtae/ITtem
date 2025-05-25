import useReadNotificationMessage from "@/domains/notification/hooks/useReadNotificationMessage";

interface IProps {
  messageId: string;
  isRead: boolean;
}

export default function ReadBtn({ messageId, isRead }: IProps) {
  const { onClickRead } = useReadNotificationMessage({ messageId });

  return (
    !isRead && (
      <button onClick={onClickRead} className="float-end mt-1 mr-1 text-[11px]">
        읽음
      </button>
    )
  );
}
