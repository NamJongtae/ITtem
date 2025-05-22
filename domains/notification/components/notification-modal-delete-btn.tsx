import useDeleteNotificationMessage from "@/domains/notification/hooks/useDeleteNotificationMessage";

interface IProps {
  messageId: string;
}

export default function NotificationModalDeleteBtn({ messageId }: IProps) {
  const { onClickDelete } = useDeleteNotificationMessage({ messageId });

  return (
    <button onClick={onClickDelete} className="float-end mt-1 mr-1 text-[11px]">
      삭제
    </button>
  );
}
