import useDeleteAllNotificationMessagesMutate from "@/hooks/react-query/mutations/notification/useDeleteAllNotificationMessagesMutate";
import { NotificationMessageData } from "@/types/notification-types";
import { toast } from "react-toastify";

interface IParams {
  messageData: NotificationMessageData[] | undefined;
  lastMessageKey: string;
}
export default function useDeleteAllNotificationMessage({
  messageData,
  lastMessageKey
}: IParams) {
  const { mutate } = useDeleteAllNotificationMessagesMutate();

  const onClickDeleteAll = () => {
    if (!messageData || messageData.length === 0) {
      toast.warn("삭제할 알림 메세지가 없어요.");
      return;
    }
    const isDelete = confirm("정말 모든 메세지를 삭제하겠어요?");
    if (isDelete) {
      mutate(lastMessageKey);
    }
  };

  return { onClickDeleteAll };
}
