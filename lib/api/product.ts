import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import { ProductCategory, ProductData, ProductUploadData } from "@/types/productTypes";
import { ProductListResponseData, ProductResponseData } from '@/types/apiTypes';

export async function getTodayProductList(
  page: unknown = 1,
  limit: number = 10
): Promise<AxiosResponse<{ product: ProductData[]; message: string }>> {
  try {
    const response = await customAxios(
      `/api/product/today?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryProductList({
  category = ProductCategory.전체,
  page = 1,
  limit = 10,
  location,
}: {
  category: ProductCategory;
  page: unknown;
  limit: number;
  location?: string;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product?category=${category}&page=${page}&limit=${limit}&location=${location}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSearchProductList({
  category = ProductCategory.전체,
  page = 1,
  limit = 10,
  keyword,
}: {
  category: ProductCategory;
  page: unknown;
  limit: number;
  keyword: string;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product/search?keyword=${keyword}&category=${category}&page=${page}&limit=${limit}`
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
