import { ApiResponse } from "@/shared/common/types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function destoryDBSession(
  email: string
): Promise<ApiResponse> {
  return customFetch<ApiResponse>("/api/auth/destory-db-session", {
    method: "DELETE",
    body: JSON.stringify({ email })
  });
}
