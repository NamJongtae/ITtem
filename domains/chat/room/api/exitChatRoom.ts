import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
import { AxiosResponse } from "axios";

export default async function exitChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(`/api/chat/${chatRoomId}/exit`);
    return response;
  } catch (error) {
    throw error;
  }
}
