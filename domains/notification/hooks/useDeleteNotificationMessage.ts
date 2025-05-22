import useDeleteNotificationMessageMutate from "./mutations/useDeleteNotificationMessageMutate";

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
