import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import {
  ProductCategory,
  ProductData,
  ProductUploadData,
  TradingStatus,
} from "@/types/productTypes";
import {
  ProductDetailResponseData,
  ProductListResponseData,
  ProductResponseData,
  PurchaseTradingResponseData,
  SalesTradingResponseData,
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

export async function incrementViewCount(
  productId: string
): Promise<AxiosResponse<{ message: string; viewCount: number }>> {
  try {
    const response = await customAxios.patch(`/api/product/${productId}/view`);
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

export async function purchaseProduct(
  productId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.post(
      `/api/product/${productId}/purchase`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSalesTrading({
  status = TradingStatus.TRADING,
  cursor,
  limit = 10,
  search,
}: {
  status?: string;
  cursor: unknown;
  search?: string;
  limit?: number;
}): Promise<AxiosResponse<SalesTradingResponseData>> {
  try {
    const response = await customAxios(
      `/api/sales-trading?status=${status}${search ? `&search=${search}` : ""}${
        cursor ? `&cursor=${cursor}&limit=${limit}` : `&limit=${limit}`
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPurchaseTrading({
  status = TradingStatus.TRADING,
  cursor,
  limit = 10,
  search,
}: {
  status?: string;
  cursor: unknown;
  search?: string;
  limit?: number;
}): Promise<AxiosResponse<PurchaseTradingResponseData>> {
  try {
    const response = await customAxios(
      `/api/purchase-trading?status=${status}${
        search ? `&search=${search}` : ""
      }${cursor ? `&cursor=${cursor}&limit=${limit}` : `&limit=${limit}`}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
