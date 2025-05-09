import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import {
  KakaoAddressDocument,
  ProductCategory,
  ProductData,
  ProductImgData,
  ProductUploadData
} from "@/types/product-types";
import {
  ProductDetailResponseData,
  ProductListResponseData,
  ProductResponseData,
  ReviewResponseData,
  UploadImgResponseData
} from "@/types/api-types";
import { FieldValues } from "react-hook-form";
import { deleteImgToFirestore, uploadMultiImgToFirestore } from "./firebase";

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

export async function getPopularProductList(): Promise<
  AxiosResponse<ProductListResponseData>
> {
  try {
    const response = await customAxios("/api/product/popular");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getRecommendProductList(
  cursor: unknown = null,
  limit: number = 10
): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product/recommend?${cursor ? `cursor=${cursor}` : ""}&limit=${limit}`
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
  location
}: {
  category?: ProductCategory;
  cursor?: unknown;
  limit?: number;
  location?: string;
}): Promise<AxiosResponse<ProductListResponseData>> {
  try {
    const response = await customAxios(
      `/api/product?category=${category}${
        cursor ? `&cursor=${cursor}` : ""
      }&limit=${limit}${location ? `&location=${location}` : ""}`
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
  keyword
}: {
  category: ProductCategory;
  keyword: string;
  cursor?: unknown;
  limit?: number;
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
  productIds
}: {
  category: ProductCategory;
  cursor?: unknown;
  limit?: number;
  productIds: string[];
}) {
  try {
    const response = await customAxios.post(
      `/api/profile/product?${
        cursor ? `cursor=${cursor}&` : ""
      }category=${category}&limit=${limit}`,
      {
        productIds
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
      productData
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
      productData
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

export async function getReview(
  productId: string
): Promise<AxiosResponse<ReviewResponseData>> {
  try {
    const response = await customAxios(`/api/product/${productId}/review`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function uploadReview({
  productId,
  reviewScore,
  reviewContent,
  reviewTags
}: {
  productId: string;
  reviewScore: number;
  reviewContent: string;
  reviewTags: number[];
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.post(
      `/api/product/${productId}/review`,
      {
        reviewScore,
        reviewContent,
        reviewTags
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function searchAddress(address: string) {
  try {
    const response = await customAxios(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
        },
        withCredentials: false
      }
    );
    const data = response.data.documents as KakaoAddressDocument[];
    const address_name = data.map((data) => {
      return data.address_name;
    });
    return address_name;
  } catch (error) {
    throw error;
  }
}

export const setProductEditData = async ({
  values,
  productData,
  productEditData
}: {
  values: FieldValues;
  productData: ProductData;
  productEditData: Partial<ProductData>;
}) => {
  for (const key of Object.keys(values)) {
    if (key === "price") {
      if (productData[key] !== parseInt(values.price.replace(",", ""), 10)) {
        productEditData.price = parseInt(values.price.replace(",", ""), 10);
      }
    } else if (key === "prevImgData") {
      if (
        JSON.stringify(productData?.imgData) !==
        JSON.stringify(values.prevImgData)
      ) {
        productEditData.imgData = values.prevImgData;
      }
      if (values.imgData) {
        const imgFiles = values.imgData.filter(
          (data: object) => data instanceof File
        );
        const imgData = await uploadMultiImgToFirestore(imgFiles);
        productEditData.imgData = [
          ...values.prevImgData,
          ...(imgData as UploadImgResponseData[])
        ];
      }
    } else if (
      key === "description" ||
      key === "transaction" ||
      key === "deliveryFee" ||
      key === "returnPolicy" ||
      key === "condition" ||
      key === "location" ||
      key === "category" ||
      key === "name"
    ) {
      if (productData[key] !== values[key]) {
        productEditData[key] = values[key];
      }
    }
  }
};

export const deleteProductImages = async ({
  values,
  productData,
  productEditData
}: {
  values: FieldValues;
  productData: ProductData;
  productEditData: Partial<ProductData>;
}) => {
  if (productEditData.imgData && values.prevImgData) {
    const productDataImgName = productData.imgData.map((data) => data.name);
    const prevImgDataImgName = values.prevImgData.map(
      (data: ProductImgData) => data.name
    );
    await deleteImgToFirestore(productDataImgName, prevImgDataImgName);
  }
};
