import { ApiResponse } from "@/shared/common/types/responseTypes";
import { NotificationMessageData } from "./notificationTypes";

export interface NotificationResponseData extends ApiResponse {
  messages: NotificationMessageData[];
  nextKey: string;
}
