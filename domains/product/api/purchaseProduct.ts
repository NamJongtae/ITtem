import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import { PurchaseProductResponseData } from "../types/reponse-types";

export default async function purchaseProduct(
  productId: string
): Promise<AxiosResponse<PurchaseProductResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/product/${productId}/purchase`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
