import { AxiosResponse } from "axios";
import { ProductData } from "../../shared/types/productTypes";
import { ProductResponseData } from "../../shared/types/reponseTypes";
import customAxios from "@/shared/common/utils/customAxios";

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
