import { AxiosResponse } from "axios";
import { ProductCategory } from "../types/product-types";
import { ProductListResponseData } from "../types/reponse-types";
import customAxios from "@/utils/customAxios";

export default async function getSearchProductList({
  category = ProductCategory.전체,
  cursor = null,
  limit = 10,
  keyword
}: {
  category: ProductCategory;
  keyword: string;
  cursor?: unknown;
  limit?: number;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product/search?keyword=${keyword}&category=${category}${
        cursor ? `&cursor=${cursor}` : ""
      }&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
