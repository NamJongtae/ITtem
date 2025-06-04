import getRecommendProductList from "@/domains/product/shared/api/getRecommendProductList";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductListResponseData } from "../../../types/reponseTypes";
import { ProductData } from "../../../types/productTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getRecommendProductList API 함수 테스트", () => {
  const mockCursor = "cursor123";
  const mockLimit = 5;

  const mockResponse: AxiosResponse<ProductListResponseData> = {
    data: {
      products: [{ _id: "product1", name: "추천상품1" } as ProductData],
      message: "추천 상품 목록 조회에 성공했어요."
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

  it("cursor와 limit을 쿼리에 포함하여 GET 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getRecommendProductList(mockCursor, mockLimit);

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/recommend?cursor=${mockCursor}&limit=${mockLimit}`
    );
    expect(result).toEqual(mockResponse);
  });

  it("cursor가 null일 경우 cursor 없이 요청을 보냅니다..", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getRecommendProductList(null, mockLimit);

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/recommend?&limit=${mockLimit}`
    );
  });

  it("limit가 없는 경우 'limit=10'을 쿼리에 포함하여 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getRecommendProductList(mockCursor);

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/recommend?cursor=${mockCursor}&limit=10`
    );
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "추천 상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(
      getRecommendProductList(mockCursor, mockLimit)
    ).rejects.toThrow(
      "추천 상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
