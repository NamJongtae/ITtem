import { AxiosResponse } from "axios";
import { ProductUploadData } from "../types/product-types";
import { ProductResponseData } from "../types/reponse-types";
import customAxios from "@/utils/customAxios";

export default async function uploadProduct(
  productData: ProductUploadData
): Promise<AxiosResponse<ProductResponseData>> {
  try {
    const response = await customAxios.post("/api/product/upload", {
      productData
    });
    return response;
  } catch (error) {
    throw error;
  }
}
