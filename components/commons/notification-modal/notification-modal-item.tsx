import { getDateFormat } from "@/lib/getDateFormate";
import { NotificationMessageData } from "@/types/notification-types";
import NotificationModalReadBtn from "./notification-modal-read-btn";
import NotificationModalDeleteBtn from "./notification-modal-delete-btn";

interface IProps {
  data: NotificationMessageData;
}

export default function NotificationModalItem({ data }: IProps) {
  return (
    <li className="text-xs" key={data?.id}>
      <time className="text-[11px] mb-1 inline-block ml-1 text-gray-500">
        {getDateFormat((data?.timestamp as string) || "")}
      </time>
      <p
        className={`${
          !data?.isRead && "bg-indigo-100"
        } border-2 border-blue-200 rounded-md w-full p-2 transition-all duration-200 whitespace-pre-wrap`}
      >
        {data?.content}
      </p>
      <div className="flex justify-end">
        <NotificationModalReadBtn messageId={data.id} isRead={data.isRead} />
        <NotificationModalDeleteBtn messageId={data.id} />
      </div>
    </li>
  );
}
