import getRecommendProductList from "@/domains/product/shared/api/getRecommendProductList";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductListResponseData } from "../../../types/reponseTypes";
import { ProductData } from "../../../types/productTypes";

jest.mock("@/shared/common/utils/customFetch");

describe("getRecommendProductList API 함수 테스트", () => {
  const mockCursor = "cursor123";
  const mockLimit = 5;

  const mockData: ProductListResponseData = {
    products: [{ _id: "product1", name: "추천상품1" } as ProductData],
    message: "추천 상품 목록 조회에 성공했어요."
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("cursor와 limit을 쿼리에 포함하여 GET 요청을 보냅니다.", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    };

    (customFetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getRecommendProductList(mockCursor, mockLimit);

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product/recommend?cursor=${mockCursor}&limit=${mockLimit}`,
      false,
      {
        next: {
          revalidate: 86400,
          tags: ["product-recommend"]
        }
      }
    );
    expect(result).toEqual(mockData);
  });

  it("cursor가 null일 경우 cursor 없이 요청을 보냅니다.", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    };

    (customFetch as jest.Mock).mockResolvedValue(mockResponse);

    await getRecommendProductList(null, mockLimit);

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product/recommend?&limit=${mockLimit}`,
      false,
      {
        next: {
          revalidate: 86400,
          tags: ["product-recommend"]
        }
      }
    );
  });

  it("limit가 없는 경우 'limit=10'을 쿼리에 포함하여 요청을 보냅니다.", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    };

    (customFetch as jest.Mock).mockResolvedValue(mockResponse);

    await getRecommendProductList(mockCursor);

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product/recommend?cursor=${mockCursor}&limit=10`,
      false,
      {
        next: {
          revalidate: 86400,
          tags: ["product-recommend"]
        }
      }
    );
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const errorMessage = "추천 상품 목록 조회에 실패했어요.";
    const mockErrorResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ message: errorMessage })
    };

    (customFetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(
      getRecommendProductList(mockCursor, mockLimit)
    ).rejects.toEqual({
      status: 500,
      message: errorMessage
    });
  });
});
