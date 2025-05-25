import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
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
