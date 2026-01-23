import customAxios from "@/shared/common/utils/customAxios";
import { FollowingsResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getFollowings({
  uid,
  cursor,
  limit = 10
}: {
  uid: string;
  cursor?: string | null;
  limit?: number;
}): Promise<AxiosResponse<FollowingsResponseData>> {
  try {
    const response = await customAxios.get(
      `/api/user/${uid}/followings?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
