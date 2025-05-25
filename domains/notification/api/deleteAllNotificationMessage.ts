import customAxios from "@/shared/common/utils/customAxios";

export default async function deleteAllNotificationMessage(endKey: string) {
  try {
    await customAxios.delete(`/api/notification`, {
      data: { endKey }
    });
  } catch (error) {
    throw error;
  }
}
