import useDeleteNotificationMessageMutate from "@/hooks/querys/useDeleteNotificationMessageMutate";

interface IProps {
  messageId: string;
}

export default function NotificationItemDeleteBtn({ messageId }: IProps) {
  const { mutate } = useDeleteNotificationMessageMutate();
  const onClickDelete = () => {
    mutate(messageId);
  };

  return (
    <button onClick={onClickDelete} className="float-end mt-1 mr-1 text-[11px]">
      삭제
    </button>
  );
}
