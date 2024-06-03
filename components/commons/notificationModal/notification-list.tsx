import useNotificationInfiniteQuery from "@/hooks/querys/useNotificationInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../spinner";
import NotificationItem from "./notification-item";
import Empty from "../Empty";

export default function NotificationList() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useNotificationInfiniteQuery();

  if (error) {
    return (
      <Empty
        message={
          "알림 메세지를 조회에 실패했어요.\n 잠시 후 다시 시도해주세요."
        }
      />
    );
  }

  if (data?.length === 0) {
    return <Empty message={"알림 메세지가 없어요."} />;
  }

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
