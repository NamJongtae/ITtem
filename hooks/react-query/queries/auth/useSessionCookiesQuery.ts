import { queryKeys } from "@/query-keys/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useSessionCookiesQuery() {
  const queryKeyConfig = queryKeys.session.isExist;
  const {
    data: isExistSession,
    error: sessionQueryError,
    isSuccess: sessionQueryIsSuccess
  } = useQuery({
    queryFn: queryKeyConfig.queryFn,
    queryKey: queryKeyConfig.queryKey
  });

  return {
    isExistSession,
    sessionQueryIsSuccess,
    sessionQueryError
  };
}
