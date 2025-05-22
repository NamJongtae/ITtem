import customAxios from "@/utils/customAxios";

export default async function readNotificationMessage(messageId: string) {
  try {
    await customAxios.patch(`/api/notification/${messageId}`);
  } catch (error) {
    throw error;
  }
}
