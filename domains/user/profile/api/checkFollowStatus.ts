import { customFetch } from "@/shared/common/utils/customFetch";
import { FollowStatusResponseData } from "../types/responseTypes";

export default async function checkFollowStatus(uid: string) {
  return await customFetch<FollowStatusResponseData>(
    `/api/user/${uid}/follow-status`
  );
}
