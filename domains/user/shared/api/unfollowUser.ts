import customAxios from "@/shared/common/utils/customAxios";

export default async function unfollowUser(uid: string) {
  try {
    const response = await customAxios.delete(`/api/profile/${uid}/follow`);
    return response;
  } catch (error) {
    throw error;
  }
}
