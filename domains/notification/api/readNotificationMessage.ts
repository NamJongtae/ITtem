import customAxios from "@/shared/common/utils/customAxios";

export default async function readNotificationMessage(messageId: string) {
  try {
    await customAxios.patch(`/api/notification/${messageId}`);
  } catch (error) {
    throw error;
  }
}
