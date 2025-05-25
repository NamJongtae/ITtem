import customAxios from "@/shared/common/utils/customAxios";
import { ProductListResponseData } from "../types/reponseTypes";
import { AxiosResponse } from "axios";

export default async function getPopularProductList(): Promise<
  AxiosResponse<ProductListResponseData>
> {
  try {
    const response = await customAxios("/api/product/popular");
    return response;
  } catch (error) {
    throw error;
  }
}
