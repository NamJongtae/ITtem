import { AxiosResponse } from "axios";
import { ProductUploadData } from "../types/productUploadTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { ProductResponseData } from "../../shared/types/reponseTypes";

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
