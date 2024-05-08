import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import {
  ProductCategory,
  ProductData,
  ProductUploadData,
} from "@/types/productTypes";
import {
  ProductDetailResponseData,
  ProductListResponseData,
  ProductResponseData,
} from "@/types/apiTypes";

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

export async function getProfileProductList({
  cursor = null,
  limit = 10,
  category = ProductCategory.전체,
  productIds,
}: {
  category: ProductCategory;
  cursor: unknown;
  limit: number;
  productIds: string[];
}) {
  try {
    const response = await customAxios.post(
      `/api/profile/product?${
        cursor ? `cursor=${cursor}&` : ""
      }category=${category}&limit=${limit}`,
      {
        productIds,
      }
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
): Promise<AxiosResponse<ProductDetailResponseData>> {
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

export async function deleteProduct(
  id: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.delete(`/api/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function reportProduct(
  id: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(`/api/product/${id}/report`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addWish(
  id: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(`/api/product/${id}/wish`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteWish(
  id: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.delete(`/api/product/${id}/wish`);
    return response;
  } catch (error) {
    throw error;
  }
}
