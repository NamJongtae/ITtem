import { ApiResponse } from "@/shared/common/types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function destoryDBSession(
  email: string
): Promise<ApiResponse> {
  const response = await customFetch("/api/auth/destory-db-session", {
    method: "DELETE",
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {});
    throw {
      status: response.status,
      message: errorData?.message ?? "세션 ID 삭제에 실패했어요."
    };
  }

  return response.json();
}
