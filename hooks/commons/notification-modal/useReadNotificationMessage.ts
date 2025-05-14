import useReadNotificationMessageMutate from "@/hooks/react-query/mutations/notification/useReadNotificationMessageMutate";

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
