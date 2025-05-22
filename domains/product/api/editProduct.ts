import { AxiosResponse } from "axios";
import { ProductData } from "../types/product-types";
import { ProductResponseData } from "../types/reponse-types";
import customAxios from "@/utils/customAxios";

export default async function editProduct(
  id: string,
  productData: Partial<ProductData>
): Promise<AxiosResponse<ProductResponseData>> {
  try {
    const response = await customAxios.patch(`/api/product/${id}`, {
      productData
    });
    return response;
  } catch (error) {
    throw error;
  }
}
