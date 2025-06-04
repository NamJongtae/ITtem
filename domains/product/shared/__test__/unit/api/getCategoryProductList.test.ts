import getCategoryProductList from "@/domains/product/shared/api/getCategoryProductList";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductListResponseData } from "@/domains/product/shared/types/reponseTypes";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getCategoryProductList API 함수 테스트", () => {
  const mockResponse: AxiosResponse<ProductListResponseData> = {
    data: {
      message: "상품 목록 조회에 성공했어요.",
      products: []
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("category가 없는 경우 'category=전체', limit 인자 값이 없는 경우 'limit=10' 쿼리에 포함하여 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getCategoryProductList({});

    expect(customAxios).toHaveBeenCalledWith(
      "/api/product?category=전체&limit=10"
    );
    expect(result).toEqual(mockResponse);
  });

  it("category, cursor, location이 있는 경우 쿼리에 포함하여 요청을 보냅니다.", async () => {
    const category = ProductCategory.전자기기;
    const cursor = "abc123";
    const limit = 5;
    const location = "서울";

    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getCategoryProductList({
      category,
      cursor,
      limit,
      location
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product?category=${category}&cursor=${cursor}&limit=${limit}&location=${location}`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(
      getCategoryProductList({ category: ProductCategory.전자기기 })
    ).rejects.toThrow(
      "상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
