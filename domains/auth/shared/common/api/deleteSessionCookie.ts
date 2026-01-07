import { ApiResponse } from "@/shared/common/types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function deleteSessionCookie(): Promise<ApiResponse> {
  const response = await customFetch("/api/auth/session-cookie", {
    method: "DELETE"
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {});
    throw {
      status: response.status,
      message: errorData?.message ?? "세션 쿠기 삭제에 실패했어요."
    };
  }

  return response.json();
}
