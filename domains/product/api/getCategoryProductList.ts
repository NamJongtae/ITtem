import { AxiosResponse } from "axios";
import { ProductCategory } from "../types/product-types";
import { ProductListResponseData } from "../types/reponse-types";
import customAxios from "@/utils/customAxios";

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
