import NotificationModalDeleteAllBtn from "./notification-modal-delete-all-btn";
import NotificationModalReadAllBtn from "./notification-modal-read-all-btn";
import { NotificationMessageData } from "@/domains/notification/types/notification-types";

interface IProps {
  messageData: NotificationMessageData[];
  lastMessageKey: string;
}

export default function NotificationModalBtns({
  messageData,
  lastMessageKey
}: IProps) {
  return (
    <div className="flex gap-2 justify-end mt-2 mr-2">
      <NotificationModalReadAllBtn
        messageData={messageData}
        lastMessageKey={lastMessageKey}
      />
      <NotificationModalDeleteAllBtn
        messageData={messageData}
        lastMessageKey={lastMessageKey}
      />
    </div>
  );
}
