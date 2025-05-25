import { AxiosResponse } from "axios";
import { ProductDetailResponseData } from "../../detail/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

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
