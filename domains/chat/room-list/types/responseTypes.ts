import { ApiResponse } from "@/shared/common/types/responseTypes";

export interface StartChatResponseData extends ApiResponse {
  chatRoomId: string;
}
