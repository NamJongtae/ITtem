import { AxiosResponse } from "axios";
import { ProductDetailResponseData } from "../types/reponse-types";
import customAxios from "@/utils/customAxios";

export default async function getProduct(
  id: string
): Promise<AxiosResponse<ProductDetailResponseData>> {
  try {
    const response = await customAxios(`/api/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
