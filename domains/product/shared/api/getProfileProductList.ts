import customAxios from "@/shared/common/utils/customAxios";
import { ProductCategory } from "../types/productTypes";

export default async function getProfileProductList({
  cursor = null,
  limit = 10,
  category = ProductCategory.전체,
  productIds
}: {
  category: ProductCategory;
  cursor?: unknown;
  limit?: number;
  productIds: string[];
}) {
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
