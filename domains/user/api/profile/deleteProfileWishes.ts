import { DeleteProfileWishesResponseData } from "@/domains/product/types/reponse-types";
import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function deleteProfileWishes(
  wishProductIds: string[]
): Promise<AxiosResponse<DeleteProfileWishesResponseData>> {
  try {
    const response = await customAxios.delete("/api/profile/wish", {
      data: { wishProductIds }
    });
    return response;
  } catch (error) {
    throw error;
  }
}
