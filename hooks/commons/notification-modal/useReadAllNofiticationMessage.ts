import useReadAllNotificationMessagesMutate from "@/hooks/react-query/mutations/notification/useReadAllNotificationMessageMutate";
import { NotificationMessageData } from "@/types/notification-types";
import { toast } from "react-toastify";

interface IParams {
  messageData: NotificationMessageData[] | undefined;
  lastMessageKey: string;
}

export default function useReadAllNofiticationMessage({
  messageData,
  lastMessageKey
}: IParams) {
  const { mutate } = useReadAllNotificationMessagesMutate();

  const onClickReadAll = () => {
    if (!messageData?.find((data) => data.isRead === false)) {
      toast.warn("읽음 처리할 알림 메세지가 없어요.");
      return;
    }
    const isRead = confirm("정말 모든 메세지를 읽음 처리하겠어요?");
    if (isRead) {
      mutate(lastMessageKey);
    }
  };

  return { onClickReadAll };
}
