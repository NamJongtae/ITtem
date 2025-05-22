import useReadNotificationMessageMutate from "./mutations/useReadNotificationMessageMutate";

interface IParams {
  messageId: string;
}

export default function useReadNotificationMessage({ messageId }: IParams) {
  const { mutate } = useReadNotificationMessageMutate();

  const onClickRead = () => {
    mutate(messageId);
  };

  return { onClickRead };
}
