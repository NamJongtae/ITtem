import getProduct from "@/domains/product/shared/api/getProduct";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductDetailResponseData } from "@/domains/product/detail/types/responseTypes";
import { ProductDetailData } from "@/domains/product/detail/types/productDetailTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getProduct API 함수 테스트", () => {
  const mockProductId = "product123";

  const mockResponse: AxiosResponse<ProductDetailResponseData> = {
    data: {
      message: "상품 조회에 성공했어요.",
      product: {
        _id: mockProductId,
        name: "테스트 상품",
        description: "테스트 설명",
        price: 10000
      } as ProductDetailData
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

  it("상품 ID로 GET 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getProduct(mockProductId);

    expect(customAxios).toHaveBeenCalledWith(`/api/product/${mockProductId}`);
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 조회에 실패했어요\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getProduct(mockProductId)).rejects.toThrow(
      "상품 조회에 실패했어요\n잠시 후 다시 시도해주세요."
    );
  });
});
