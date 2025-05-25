import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
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
