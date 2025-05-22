import { AxiosResponse } from "axios";
import { ProductListResponseData } from "../types/reponse-types";
import customAxios from "@/utils/customAxios";

export default async function getRecommendProductList(
  cursor: unknown = null,
  limit: number = 10
): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product/recommend?${cursor ? `cursor=${cursor}` : ""}&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
