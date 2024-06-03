import customAxios from "../customAxios";
import { AxiosResponse } from "axios";
import { NotificationResponseData } from "@/types/apiTypes";

export const getNotificationMessage = async ({
  lastKey,
  limit = 10,
}: {
  lastKey?: unknown;
  limit?: number;
}): Promise<AxiosResponse<NotificationResponseData>> => {
  try {
    const response = await customAxios(
      `/api/notification/?limit=${limit}${lastKey ? `&lastKey=${lastKey}` : ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
