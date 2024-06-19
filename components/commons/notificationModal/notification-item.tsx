import { getDateFormat } from "@/lib/getDateFormate";
import { NotificationMessageData } from "@/types/notification";
import NotificationItemReadBtn from "./notification-item-read-btn";
import NotificationItemDeleteBtn from "./notification-item-delete-btn";

interface IProps {
  data: NotificationMessageData;
}

export default function NotificationItem({ data }: IProps) {
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
        <NotificationItemReadBtn messageId={data.id} isRead={data.isRead} />
        <NotificationItemDeleteBtn messageId={data.id} />
      </div>
    </li>
  );
}
