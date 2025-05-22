import customAxios from "@/utils/customAxios";

export default async function followUser(uid: string) {
  try {
    const response = await customAxios.post(`/api/profile/${uid}/follow`);
    return response;
  } catch (error) {
    throw error;
  }
}
