import getSessionCookies from "@/domains/auth/api/getSessionCookies";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const sessionQueryKey = createQueryKeys("session", {
  isExist: {
    queryKey: null,
    queryFn: async () => {
      const response = await getSessionCookies();
      return response.data?.ok;
    }
  }
});

export default sessionQueryKey;
