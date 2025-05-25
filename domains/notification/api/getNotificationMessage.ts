import { AxiosResponse } from "axios";
import { NotificationResponseData } from "../types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

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
