import useNotificationInfiniteQuery from "../hooks/queries/useNotificationInfiniteQuery";
import Spinner from "@/components/spinner";
import NotificationModalItem from "./notification-modal-item";
import Empty from "@/components/empty";
import NotificationModalBtns from "./notification-modal-btns";
import useInfiniteScrollObserver from "@/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/InfiniteScrollTarget";

export default function NotificationModalList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNotificationInfiniteQuery();

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (data?.length === 0) {
    return (
      <Empty message={"알림 메세지가 없어요."} messageSize="sm" iconSize={50} />
    );
  }

  return (
    <div className="h-[380px] overflow-y-scroll">
      {data && (
        <NotificationModalBtns
          messageData={data}
          lastMessageKey={data[data.length - 1].id}
        />
      )}

      <ul className="flex flex-col w-full p-5 pt-2">
        {
          <>
            {data?.map((data) => (
              <NotificationModalItem key={data.id} data={data} />
            ))}
            {isFetchingNextPage && (
              <li className="flex justify-center w-full">
                <Spinner />
              </li>
            )}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        }
      </ul>
    </div>
  );
}
