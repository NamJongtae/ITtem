import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";
import { WishlistProductResponseData } from "../types/responseTypes";

export default async function getWishlistProductData({
  cursor,
  limit = 10
}: {
  cursor?: string | null;
  limit?: number;
}): Promise<AxiosResponse<WishlistProductResponseData>> {
  try {
    const response = await customAxios(
      `/api/profile/wish?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
