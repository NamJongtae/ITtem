import customAxios from "@/shared/common/utils/customAxios";

export default async function deleteNotificationMessage(messageId: string) {
  try {
    await customAxios.delete(`/api/notification/${messageId}`);
  } catch (error) {
    throw error;
  }
}
