import { AxiosResponse } from "axios";
import { ProductCategory } from "../types/productTypes";
import { ProductListResponseData } from "../types/reponseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function getSearchProductList({
  category = ProductCategory.전체,
  cursor = null,
  limit = 12,
  keyword
}: {
  category: ProductCategory;
  keyword: string;
  cursor?: string | null;
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
