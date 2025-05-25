import { AxiosResponse } from "axios";
import { ReceivedReviewsResponseData } from "../types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function getReceivedReviews({
  uid,
  cursor,
  limit = 10
}: {
  uid: string;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<ReceivedReviewsResponseData>> {
  try {
    const response = await customAxios(
      `/api/profile/${uid}/review?limit=${limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
