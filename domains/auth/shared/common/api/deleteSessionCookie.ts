import { ApiResponse } from "@/shared/common/types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function deleteSessionCookie(): Promise<ApiResponse> {
  return customFetch<ApiResponse>("/api/auth/session-cookie", {
    method: "DELETE"
  });
}
