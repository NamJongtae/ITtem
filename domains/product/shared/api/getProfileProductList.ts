import customAxios from "@/shared/common/utils/customAxios";
import { ProductCategory } from "../types/productTypes";
import { AxiosResponse } from "axios";
import { ProductListResponseData } from "../types/reponseTypes";

export default async function getProfileProductList({
  cursor = null,
  limit = 12,
  category = ProductCategory.전체,
  productIds
}: {
  category: ProductCategory;
  cursor?: string | null;
  limit?: number;
  productIds: string[];
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/profile/product?${
        cursor ? `cursor=${cursor}&` : ""
      }category=${category}&limit=${limit}`,
      {
        productIds
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
