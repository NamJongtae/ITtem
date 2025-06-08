import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import useNotificationInfiniteQuery from "@/domains/notification/hooks/queries/useNotificationInfiniteQuery";

const mockQueryFn = jest.fn().mockResolvedValue({
  messages: [
    { id: "1", content: "message1", isRead: false },
    { id: "2", content: "message2", isRead: true }
  ],
  nextKey: null
});

jest.mock("@/shared/common/query-keys/queryKeys", () => ({
  queryKeys: {
    notification: {
      messages: (limit: number) => ({
        queryKey: ["notification", "messages", limit],
        queryFn: mockQueryFn
      })
    }
  }
}));

describe("useNotificationInfiniteQuery 훅 테스트", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </QueryClientProvider>
      )
    };
  };

  it("초기 데이터를 올바르게 반환하고 queryFn이 호출된다", async () => {
    const { result } = renderHook(
      () => useNotificationInfiniteQuery(10),
      createWrapper()
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { id: "1", content: "message1", isRead: false },
        { id: "2", content: "message2", isRead: true }
      ]);
      expect(result.current.hasNextPage).toBeFalsy();
      expect(result.current.isFetchingNextPage).toBeFalsy();
    });

    expect(mockQueryFn).toHaveBeenCalled();
  });
});
