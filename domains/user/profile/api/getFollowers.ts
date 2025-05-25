import { AxiosResponse } from "axios";
import { FollowersResponseData } from "../types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function getFollowers({
  cursor,
  limit = 10,
  userIds
}: {
  userIds: string[] | undefined;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<FollowersResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/followers?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`,
      {
        userIds
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
