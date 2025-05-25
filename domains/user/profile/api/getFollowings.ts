import customAxios from "@/shared/common/utils/customAxios";
import { FollowingsResponseData } from "../types/responseTypes";
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
