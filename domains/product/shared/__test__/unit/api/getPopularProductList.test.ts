import getPopularProductList from "@/domains/product/shared/api/getPopularProductList";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductListResponseData } from "@/domains/product/shared/types/reponseTypes";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

describe("getPopularProductList API 함수 테스트", () => {
  const mockResponseData: ProductListResponseData = {
    message: "인기 상품 조회에 성공했어요.",
    products: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET 요청을 보내고 응답 데이터를 그대로 반환합니다.", async () => {

    (customFetch as jest.Mock).mockResolvedValue(mockResponseData);

    const result = await getPopularProductList();

    expect(customFetch).toHaveBeenCalledWith("/api/product/popular", {
      next: {
        revalidate: 60,
        tags: ["product-popular"]
      }
    });

    expect(result).toEqual(mockResponseData);
  });

  it("customFetch가 에러를 throw하면 동일한 에러를 전파합니다.", async () => {
    const fetchError = {
      status: 500,
      message: "인기 상품 목록 조회에 실패했어요."
    };

    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(getPopularProductList()).rejects.toEqual(fetchError);
  });
});
