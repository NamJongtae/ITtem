import { AxiosResponse } from "axios";
import { ProductCategory } from "../types/productTypes";
import { ProductListResponseData } from "../types/reponseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function getCategoryProductList({
  category = ProductCategory.전체,
  cursor = null,
  limit = 10,
  location
}: {
  category?: ProductCategory;
  cursor?: unknown;
  limit?: number;
  location?: string;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product?category=${category}${
        cursor ? `&cursor=${cursor}` : ""
      }&limit=${limit}${location ? `&location=${location}` : ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
