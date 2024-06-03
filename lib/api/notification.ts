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

export const readNotificationMessage = async (messageId: string) => {
  try {
    await customAxios.patch(`/api/notification/${messageId}/read`);
  } catch (error) {
    throw error;
  }
};

export const deleteNotificationMessage = async (messageId: string) => {
  try {
    await customAxios.delete(`/api/notification/${messageId}`);
  } catch (error) {
    throw error;
  }
};

export const readAllNotificationMessage = async () => {
  try {
    await customAxios.patch(`/api/notification`);
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotificationMessage = async () => {
  try {
    await customAxios.delete(`/api/notification`);
  } catch (error) {
    throw error;
  }
};
