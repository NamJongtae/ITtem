import getPopularProductList from "@/domains/product/shared/api/getPopularProductList";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductListResponseData } from "@/domains/product/shared/types/reponseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getPopularProductList API 함수 테스트", () => {
  const mockResponse: AxiosResponse<ProductListResponseData> = {
    data: {
      message: "인기 상품 조회에 성공했어요.",
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

  it("GET 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getPopularProductList();

    expect(customAxios).toHaveBeenCalledWith("/api/product/popular");
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "인기 상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요"
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getPopularProductList()).rejects.toThrow(
      "인기 상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요"
    );
  });
});
