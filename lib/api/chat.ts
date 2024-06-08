import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import { StartChatResponseData } from "@/types/apiTypes";

export async function startChat({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}): Promise<AxiosResponse<StartChatResponseData>> {
  try {
    const response = await customAxios.post(`/api/chat`, {
      productId,
      userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendToChatMessage({
  chatRoomId,
  message,
}: {
  chatRoomId: string;
  message: string;
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.post(`/api/chat/message`, {
      chatRoomId,
      message,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
