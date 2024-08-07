import customAxios from "../customAxios";
import { AxiosResponse } from "axios";
import { NotificationResponseData } from "@/types/api-types";

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
    await customAxios.patch(`/api/notification/${messageId}`);
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

export const readAllNotificationMessage = async (endKey: string) => {
  try {
    await customAxios.patch(`/api/notification`, {
      endKey,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotificationMessage = async (endKey: string) => {
  try {
    await customAxios.delete(`/api/notification`, {
      data: { endKey },
    });
  } catch (error) {
    throw error;
  }
};
