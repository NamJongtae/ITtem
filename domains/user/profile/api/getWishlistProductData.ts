import { WishlistProductData } from "../types/profileTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function getWishlistProductData({
  wishProductIds,
  cursor,
  limit = 10
}: {
  wishProductIds: string[];
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<WishlistProductData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/wish?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
      {
        wishProductIds
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
