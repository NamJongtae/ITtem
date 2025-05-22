import { ApiResponse } from "@/types/response-types";
import { NotificationMessageData } from "../../notification/types/notification-types";

export interface NotificationResponseData extends ApiResponse {
  messages: NotificationMessageData[];
  nextKey: string;
}

export interface StartChatResponseData extends ApiResponse {
  chatRoomId: string;
}
