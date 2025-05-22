import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function deleteChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.delete(`/api/chat/${chatRoomId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
