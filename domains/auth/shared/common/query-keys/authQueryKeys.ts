import getUser from "@/domains/user/shared/api/getUser";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const authQueryKey = createQueryKeys("auth", {
  info: {
    queryKey: null,
    queryFn: getUser
  }
});

export default authQueryKey;
