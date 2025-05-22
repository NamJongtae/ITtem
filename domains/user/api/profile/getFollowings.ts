import customAxios from "@/utils/customAxios";
import { FollowingsResponseData } from "../../types/response-types";
import { AxiosResponse } from "axios";

export default async function getFollowings({
  cursor,
  limit = 10,
  userIds
}: {
  userIds: string[] | undefined;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<FollowingsResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/followings?limit=${limit}${
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
