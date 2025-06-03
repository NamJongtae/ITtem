import { DeleteWishlistProductDataResponseData } from "../types/profileTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function deleteWishlistProductData(
  wishProductIds: string[]
): Promise<AxiosResponse<DeleteWishlistProductDataResponseData>> {
  try {
    const response = await customAxios.delete("/api/profile/wish", {
      data: { wishProductIds }
    });
    return response;
  } catch (error) {
    throw error;
  }
}
