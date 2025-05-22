import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import { DeleteProductResponseData } from "../types/reponse-types";

export default async function deleteProduct(
  id: string
): Promise<AxiosResponse<DeleteProductResponseData>> {
  try {
    const response = await customAxios.delete(`/api/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
