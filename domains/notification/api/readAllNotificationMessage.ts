import customAxios from "@/utils/customAxios";

export default async function readAllNotificationMessage(endKey: string) {
  try {
    await customAxios.patch(`/api/notification`, {
      endKey
    });
  } catch (error) {
    throw error;
  }
}
