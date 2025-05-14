import useDeleteNotificationMessageMutate from "@/hooks/react-query/mutations/notification/useDeleteNotificationMessageMutate";

interface IParams {
  messageId: string;
}

export default function useDeleteNotificationMessage({ messageId }: IParams) {
  const { mutate } = useDeleteNotificationMessageMutate();
  const onClickDelete = () => {
    const isDelete = confirm("정말 삭제하겠습니까?");
    if (isDelete) {
      mutate(messageId);
    }
  };

  return { onClickDelete };
}
