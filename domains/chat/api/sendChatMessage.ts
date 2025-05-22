import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function sendChatMessage({
  chatRoomId,
  message
}: {
  chatRoomId: string;
  message: string;
}): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.post(`/api/chat/${chatRoomId}/message`, {
      message
    });
    return response;
  } catch (error) {
    throw error;
  }
}
