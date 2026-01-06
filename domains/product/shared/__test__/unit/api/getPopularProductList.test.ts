import getPopularProductList from "@/domains/product/shared/api/getPopularProductList";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductListResponseData } from "@/domains/product/shared/types/reponseTypes";

jest.mock("@/shared/common/utils/customFetch");

describe("getPopularProductList API 함수 테스트", () => {
  const mockResponseData: ProductListResponseData = {
    message: "인기 상품 조회에 성공했어요.",
    products: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET 요청을 보내고 응답을 반환합니다.", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponseData)
    };

    (customFetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getPopularProductList();

    expect(customFetch).toHaveBeenCalledWith("/api/product/popular", false, {
      next: {
        revalidate: 60,
        tags: ["product-popular"]
      }
    });

    expect(result).toEqual(mockResponseData);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const errorMessage = "인기 상품 목록 조회에 실패했어요.";
    const mockErrorResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ message: errorMessage })
    };

    (customFetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getPopularProductList()).rejects.toEqual({
      status: 500,
      message: errorMessage
    });
  });
});
