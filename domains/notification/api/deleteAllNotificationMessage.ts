import customAxios from "@/utils/customAxios";

export default async function deleteAllNotificationMessage(endKey: string) {
  try {
    await customAxios.delete(`/api/notification`, {
      data: { endKey }
    });
  } catch (error) {
    throw error;
  }
}
