import useDeleteNotificationMessageMutate from "@/hooks/react-query/mutations/notification/useDeleteNotificationMessageMutate";

interface IProps {
  messageId: string;
}

export default function NotificationModalDeleteBtn({ messageId }: IProps) {
  const { mutate } = useDeleteNotificationMessageMutate();
  const onClickDelete = () => {
    const isDelete = confirm("정말 삭제하겠습니까?");
    if (isDelete) {
      mutate(messageId);
    }
  };

  return (
    <button onClick={onClickDelete} className="float-end mt-1 mr-1 text-[11px]">
      삭제
    </button>
  );
}
