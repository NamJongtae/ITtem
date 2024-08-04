import useReadNotificationMessageMutate from "@/hooks/react-query/mutations/notification/useReadNotificationMessageMutate";

interface IProps {
  messageId: string;
  isRead: boolean;
}

export default function NotificationModalReadBtn({ messageId, isRead }: IProps) {
  const { mutate } = useReadNotificationMessageMutate();

  const onClickRead = () => {
    mutate(messageId);
  };

  return (
    !isRead && (
      <button onClick={onClickRead} className="float-end mt-1 mr-1 text-[11px]">
        읽음
      </button>
    )
  );
}
