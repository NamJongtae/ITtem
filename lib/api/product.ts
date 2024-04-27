import { AxiosResponse } from "axios";
import customAxios from "../customAixos";
import { ProductData } from "@/types/productTypes";

export async function getTodayProductList(
  page: unknown = 1,
  limit: number = 10
): Promise<AxiosResponse<{ product: ProductData[]; message: string }>> {
  try {
    const response = await customAxios(
      `/api/product/today?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
