import { renderHook, act, waitFor } from "@testing-library/react";
import { InfiniteData } from "@tanstack/react-query";
import useDeleteAllNotificationMessagesMutate from "@/domains/notification/hooks/mutations/useDeleteAllNotificationMessagesMutate";
import deleteAllNotificationMessage from "@/domains/notification/api/deleteAllNotificationMessage";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/domains/notification/api/deleteAllNotificationMessage");

const mockDelete = deleteAllNotificationMessage as jest.Mock;

describe("useDeleteAllNotificationMessagesMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const notificationMessagesQueryKey =
    queryKeys.notification.messages().queryKey;

  const fakeData: InfiniteData<any> = {
    pageParams: [],
    pages: [{ messages: [{ id: "1", content: "test" }], nextKey: null }]
  };

  let invalidateSpy: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(notificationMessagesQueryKey, fakeData);

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 cancelQueries와 setQueryData가 실행됩니다.", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(
      () => useDeleteAllNotificationMessagesMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.mutate("end-key");
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({
        queryKey: notificationMessagesQueryKey
      });
      expect(setQueryDataSpy).toHaveBeenCalledWith(
        notificationMessagesQueryKey,
        {
          pageParams: [],
          pages: [{ messages: [], nextKey: null }]
        }
      );
    });
  });

  it("mutate가 성공하면 캐시를 비우고 invalidateQueries가 호출합니다.", async () => {
    mockDelete.mockResolvedValue(undefined);

    const { result } = renderHook(
      () => useDeleteAllNotificationMessagesMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.mutate("lastKey");
    });

    await waitFor(() => {
      const data = queryClient.getQueryData(notificationMessagesQueryKey);
      expect(data).toEqual({
        pageParams: [],
        pages: [{ messages: [], nextKey: null }]
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

  it("onError 발생 시 이전 데이터로 rollback하고, invalidateQueries, toast.warn이 호출됩니다.", async () => {
    mockDelete.mockRejectedValue({
      response: { data: { message: "삭제 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(
      () => useDeleteAllNotificationMessagesMutate(),
      {
        wrapper
      }
    );

    act(() => {
      result.current.mutate("end-key");
    });

    await waitFor(() => {
      const restored = queryClient.getQueryData(notificationMessagesQueryKey);
      expect(restored).toEqual(fakeData);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: notificationMessagesQueryKey
      });
      expect(toast.warn).toHaveBeenCalledWith("삭제 실패");
    });
  });
});
