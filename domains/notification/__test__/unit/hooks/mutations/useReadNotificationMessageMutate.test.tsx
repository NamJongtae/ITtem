import { renderHook, act, waitFor } from "@testing-library/react";
import { InfiniteData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";
import useReadNotificationMessageMutate from "@/domains/notification/hooks/mutations/useReadNotificationMessageMutate";
import readNotificationMessage from "@/domains/notification/api/readNotificationMessage";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/notification/api/readNotificationMessage");

const mockRead = readNotificationMessage as jest.Mock;

describe("useReadNotificationMessageMutate 훅 테스트", () => {
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
          { id: "2", content: "test2", isRead: false }
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

  it("mutate가 성공하면 캐시 데이터에서 해당된 메시지가 읽음 처리되고 invalidateQueries가 호출됩니다.", async () => {
    mockRead.mockResolvedValue(undefined);

    const { result } = renderHook(() => useReadNotificationMessageMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate("1");
    });

    await waitFor(() => {
      const updated = queryClient.getQueryData(notificationMessagesQueryKey);
      expect(updated).toEqual({
        ...fakeData,
        pages: [
          {
            messages: [
              { id: "1", content: "test1", isRead: true },
              { id: "2", content: "test2", isRead: false }
            ],
            nextKey: null
          }
        ]
      });
    });
  });

  it("mutate 실패 시 이전 데이터로 롤백되고 invalidateQueries, toast.warn이 호출됩니다.", async () => {
    mockRead.mockRejectedValue({
      response: { data: { message: "읽음 처리 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useReadNotificationMessageMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate("1");
    });

    await waitFor(() => {
      const restored = queryClient.getQueryData(notificationMessagesQueryKey);
      expect(restored).toEqual(fakeData);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: notificationMessagesQueryKey
      });
      expect(toast.warn).toHaveBeenCalledWith("읽음 처리 실패");
    });
  });
});
