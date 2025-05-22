import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function joinChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const reponse = await customAxios.patch(`/api/chat/${chatRoomId}/join`);
    return reponse;
  } catch (error) {
    throw error;
  }
}
