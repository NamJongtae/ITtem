import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import { AddProductWishResponseData } from "../types/reponse-types";

export default async function addProductWish(
  id: string
): Promise<AxiosResponse<AddProductWishResponseData>> {
  try {
    const response = await customAxios.patch(`/api/product/${id}/wish`);
    return response;
  } catch (error) {
    throw error;
  }
}
