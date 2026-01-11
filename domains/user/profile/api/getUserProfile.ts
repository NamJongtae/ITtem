import { ProfileResponseData } from "../types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getUserProfile(
  uid: string
): Promise<ProfileResponseData> {
  return await customFetch(`/api/profile/${uid}`, {
    next: { revalidate: 60, tags: [`profile-${uid}`] }
  });
}
