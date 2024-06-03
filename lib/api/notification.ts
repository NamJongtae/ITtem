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

export const readyNotificationMessage = async (messageId: string) => {
  try {
    await customAxios.patch(`/api/notification/${messageId}/read`);
  } catch (error) {
    throw error;
  }
};

export const deleteNotificationMessage = async (messageId: string) => {
  try {
    await customAxios.delete(
      `/api/notification/${messageId}`
    );
  } catch (error) {
    throw error;
  }
};
