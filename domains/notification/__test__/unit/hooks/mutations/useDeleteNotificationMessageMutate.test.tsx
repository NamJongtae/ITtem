import { renderHook, act, waitFor } from "@testing-library/react";
import { InfiniteData } from "@tanstack/react-query";
import useDeleteNotificationMessageMutate from "@/domains/notification/hooks/mutations/useDeleteNotificationMessageMutate";
import deleteNotificationMessage from "@/domains/notification/api/deleteNotificationMessage";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/domains/notification/api/deleteNotificationMessage");

const mockDelete = deleteNotificationMessage as jest.Mock;

describe("useDeleteNotificationMessageMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const notificationMessagesQueryKey =
    queryKeys.notification.messages().queryKey;

  const fakeData: InfiniteData<
    { messages: NotificationMessageData[]; nextKey: string | null },
    unknown
  > = {
    pageParams: [],
    pages: [
      {
        messages: [
          { id: "1", content: "test1", isRead: false },
          { id: "2", content: "test2", isRead: true }
        ] as NotificationMessageData[],
        nextKey: null
      }
    ]
  };

  let invalidateSpy: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(notificationMessagesQueryKey, fakeData);

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 cancelQueries와 setQueryData가 실행되고 메시지가 제거된다", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useDeleteNotificationMessageMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate("1");
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({
        queryKey: notificationMessagesQueryKey
      });

      const updated = queryClient.getQueryData(notificationMessagesQueryKey);
      expect(updated).toEqual({
        ...fakeData,
        pages: [
          {
            messages: [{ id: "2", content: "test2", isRead: true }],
            nextKey: null
          }
        ]
      });

      expect(setQueryDataSpy).toHaveBeenCalled();
    });
  });

  it("mutate가 성공하면 해당 메시지가 캐시에서 제거되고 invalidateQueries가 호출됩니다.", async () => {
    mockDelete.mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteNotificationMessageMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate("1");
    });

    await waitFor(() => {
      const data = queryClient.getQueryData(notificationMessagesQueryKey);
      expect(data).toEqual({
        pageParams: [],
        pages: [
          {
            messages: [
              {
                id: "2",
                content: "test2",
                isRead: true
              }
            ],
            nextKey: null
          }
        ]
      });
    });

    await waitFor(() => {
      expect(
        queryClient.isFetching({ queryKey: notificationMessagesQueryKey })
      ).toBe(0);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: notificationMessagesQueryKey
      });
    });
  });

  it("onError 발생 시 이전 데이터로 롤백되고, invalidateQueries, toast.warn이 호출됩니다.", async () => {
    mockDelete.mockRejectedValue({
      response: { data: { message: "삭제 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useDeleteNotificationMessageMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate("1");
    });

    await waitFor(() => {
      const restored = queryClient.getQueryData(["notification"]);
      expect(restored).toEqual(fakeData);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: notificationMessagesQueryKey
      });
      expect(toast.warn).toHaveBeenCalledWith("삭제 실패");
    });
  });
});
