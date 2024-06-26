import useReadAllNotificationMessagesMutate from "@/hooks/reactQuery/mutations/notification/useReadAllNotificationMessageMutate";
import { NotificationMessageData } from "@/types/notification";
import { toast } from "react-toastify";

interface IProps {
  messageData: NotificationMessageData[] | undefined;
  endKey: string;
}
export default function NotificationReadAllBtn({
  messageData,
  endKey,
}: IProps) {
  const { mutate } = useReadAllNotificationMessagesMutate();

  const onClickReadAll = () => {
    if (!messageData?.find((data) => data.isRead === false)) {
      toast.warn("읽음 처리할 알림 메세지가 없어요.");
      return;
    }
    const isRead = confirm("정말 모든 메세지를 읽음 처리하겠어요?");
    if (isRead) {
      mutate(endKey);
    }
  };

  return (
    <button
      type="button"
      onClick={onClickReadAll}
      className="relative text-[11px] before:bg-gray-400 before:absolute before:h-[11px] before:w-[1px] before:-right-[5px] before:top-1 betterhover:hover:underline"
    >
      모두 읽음
    </button>
  );
}
