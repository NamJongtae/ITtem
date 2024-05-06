import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import {
  ProductCategory,
  ProductData,
  ProductUploadData,
} from "@/types/productTypes";
import { ProductListResponseData, ProductResponseData } from "@/types/apiTypes";

export async function getTodayProductList(
  cursor: unknown = null,
  limit: number = 10
): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product/today?${cursor ? `cursor=${cursor}` : ""}&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryProductList({
  category = ProductCategory.전체,
  cursor = null,
  limit = 10,
  location,
}: {
  category: ProductCategory;
  cursor: unknown;
  limit: number;
  location?: string;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product?category=${category}${
        cursor ? `&cursor=${cursor}` : ""
      }&limit=${limit}&location=${location}`
    );
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSearchProductList({
  category = ProductCategory.전체,
  cursor = null,
  limit = 10,
  keyword,
}: {
  category: ProductCategory;
  cursor: unknown;
  limit: number;
  keyword: string;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product/search?keyword=${keyword}&category=${category}${
        cursor ? `&cursor=${cursor}` : ""
      }&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function uploadProduct(
  productData: ProductUploadData
): Promise<AxiosResponse<ProductResponseData>> {
  try {
    const response = await customAxios.post("/api/product/upload", {
      productData,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(
  id: string
): Promise<AxiosResponse<ProductResponseData>> {
  try {
    const response = await customAxios(`/api/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function editProduct(
  id: string,
  productData: Partial<ProductData>
): Promise<AxiosResponse<ProductResponseData>> {
  try {
    const response = await customAxios.patch(`/api/product/${id}`, {
      productData,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
