import getProfileProductList from "../../../api/getProfileProductList";
import customAxios from "@/shared/common/utils/customAxios";
import { ProductCategory, ProductData } from "../../../types/productTypes";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductListResponseData } from "../../../types/reponseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getProfileProductList API 함수 테스트", () => {
  const mockProductIds = ["product1", "product2"];
  const mockCursor = "cursor123";
  const mockLimit = 5;
  const mockCategory = ProductCategory.의류;

  const mockResponse: AxiosResponse<ProductListResponseData> = {
    data: {
      products: [{ _id: "product1", name: "상품1" } as ProductData],
      message: "유저 상품 목록 조회에 성공했어요."
    },
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("cursor, category, limit, productIds를 쿼리에 포함하여 POST 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getProfileProductList({
      cursor: mockCursor,
      limit: mockLimit,
      category: mockCategory,
      productIds: mockProductIds
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      `/api/profile/product?cursor=${mockCursor}&category=${mockCategory}&limit=${mockLimit}`,
      { productIds: mockProductIds }
    );
    expect(result).toEqual(mockResponse);
  });

  it("limit가 없는 경우 'limit=12'을 쿼리에 포함하여 요청을 보냅니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    await getProfileProductList({
      productIds: mockProductIds,
      category: ProductCategory.전체
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      `/api/profile/product?category=${ProductCategory.전체}&limit=12`,
      { productIds: mockProductIds }
    );
  });

  it("cursor가 없는 경우 cursor 파라미터 없이 요청합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    await getProfileProductList({
      category: mockCategory,
      productIds: mockProductIds,
      limit: mockLimit
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      `/api/profile/product?category=${mockCategory}&limit=${mockLimit}`,
      { productIds: mockProductIds }
    );
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "유저 상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(
      getProfileProductList({
        category: mockCategory,
        productIds: mockProductIds
      })
    ).rejects.toThrow(
      "유저 상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
