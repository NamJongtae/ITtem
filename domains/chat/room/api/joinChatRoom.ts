import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
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
