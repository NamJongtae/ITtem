import useNotificationInfiniteQuery from "@/hooks/react-query/queries/notification/useNotificationInfiniteQuery";
import Spinner from "../spinner";
import NotificationModalItem from "./notification-modal-item";
import Empty from "../empty";
import NotificationModalBtns from "./notification-modal-btns";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "../InfiniteScrollTarget";

export default function NotificationModalList() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useNotificationInfiniteQuery();

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (error) {
    return (
      <Empty
        message={
          "알림 메세지를 조회에 실패했어요.\n 잠시 후 다시 시도해주세요."
        }
        messageSize="sm"
        iconSize={50}
      />
    );
  }

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
        {isLoading ? (
          <li className="absolute center">
            <Spinner />
          </li>
        ) : (
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
        )}
      </ul>
    </div>
  );
}
