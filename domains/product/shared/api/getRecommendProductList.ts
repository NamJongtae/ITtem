import { AxiosResponse } from "axios";
import { ProductListResponseData } from "../types/reponseTypes";
import customAxios from "@/shared/common/utils/customAxios";

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
