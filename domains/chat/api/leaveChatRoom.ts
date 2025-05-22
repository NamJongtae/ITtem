import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function leaveChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const reponse = await customAxios.patch(`/api/chat/${chatRoomId}/leave`);
    return reponse;
  } catch (error) {
    throw error;
  }
}
