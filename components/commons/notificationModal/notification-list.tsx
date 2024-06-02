import useNotificationInfiniteQuery from "@/hooks/querys/useNotificationInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../spinner";
import NotificationItem from "./notification-item";

export default function NotificationList() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useNotificationInfiniteQuery();

  const onClickDelete = () => {};

  const onClickRead = () => {};

  return (
    <InfiniteScroll
      loadMore={() => {
        if (!isFetchingNextPage && hasNextPage && !error && !isLoading) {
          fetchNextPage();
        }
      }}
      hasMore={hasNextPage && !error && !isLoading}
    >
      <ul className="flex flex-col w-full overflow-y-scroll max-h-[345px] p-5 pt-2">
        {isLoading ? (
          <li className="mx-auto">
            <Spinner />
          </li>
        ) : (
          data?.map((data) => (
            <NotificationItem
              key={data.id}
              data={data}
              onClickDelete={onClickDelete}
              onClickRead={onClickRead}
            />
          ))
        )}
        {isFetchingNextPage && (
          <li className="mx-auto w-full">
            <Spinner />
          </li>
        )}
      </ul>
    </InfiniteScroll>
  );
}
