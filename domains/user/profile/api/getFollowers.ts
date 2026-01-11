import { AxiosResponse } from "axios";
import { FollowersResponseData } from "../types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function getFollowers({
  uid,
  cursor,
  limit = 10
}: {
  uid: string;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<FollowersResponseData>> {
  try {
    const response = await customAxios(
      `/api/user/${uid}/followers?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
