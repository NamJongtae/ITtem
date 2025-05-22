import { AxiosResponse } from "axios";
import { NotificationResponseData } from "../../chat/types/response-types";
import customAxios from "@/utils/customAxios";

export default async function getNotificationMessage({
  lastKey,
  limit = 10
}: {
  lastKey?: unknown;
  limit?: number;
}): Promise<AxiosResponse<NotificationResponseData>> {
  try {
    const response = await customAxios(
      `/api/notification/?limit=${limit}${lastKey ? `&lastKey=${lastKey}` : ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
