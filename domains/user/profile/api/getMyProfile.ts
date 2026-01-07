import { ProfileResponseData } from "../types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getMyProfile(): Promise<ProfileResponseData> {
  return customFetch<ProfileResponseData>("/api/profile");
}
