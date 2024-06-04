import useDeleteAllNotificationMessagesMutate from "@/hooks/querys/useDeleteAllNotificationMessagesMutate";
import { NotificationMessageData } from "@/types/notification";
import { toast } from "react-toastify";

interface IProps {
  messageData: NotificationMessageData[] | undefined;
  endKey: string;
}

export default function NotificationDeleteAllBtn({
  messageData,
  endKey,
}: IProps) {
  const { mutate } = useDeleteAllNotificationMessagesMutate();

  const onClickDeleteAll = () => {
    if (!messageData || messageData.length === 0) {
      toast.warn("삭제할 알림 메세지가 없어요.");
      return;
    }
    const isDelete = confirm("정말 모든 메세지를 삭제하겠어요?");
    if (isDelete) {
      mutate(endKey);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickDeleteAll}
      className="text-[11px] betterhover:hover:underline"
    >
      모두 삭제
    </button>
  );
}
