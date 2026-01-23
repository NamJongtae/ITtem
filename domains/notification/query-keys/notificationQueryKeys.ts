import getNotificationMessage from "@/domains/notification/api/getNotificationMessage";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const notificationQueryKey = createQueryKeys("notification", {
  messages: (limit: number = 10) => ({
    queryKey: ["list", limit] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getNotificationMessage({
        lastKey: pageParam as string | null,
        limit
      });

      return {
        messages: response.data.messages,
        nextKey: response.data.nextKey
      };
    }
  })
});

export default notificationQueryKey;
