import getProduct from "@/domains/product/shared/api/getProduct";
import { ProductDetailResponseData } from "@/domains/product/detail/types/responseTypes";
import { ProductDetailData } from "@/domains/product/detail/types/productDetailTypes";
import { customFetch } from "@/shared/common/utils/customFetch";
import { notFound } from "next/navigation";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn()
}));

describe("getProduct API 함수 테스트 (customFetch)", () => {
  const mockProductId = "product123";

  const mockResponseData: ProductDetailResponseData = {
    message: "상품 조회에 성공했어요.",
    product: {
      _id: mockProductId,
      name: "테스트 상품",
      description: "테스트 설명",
      price: 10000
    } as ProductDetailData
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("상품 ID로 GET 요청을 보내고 응답 데이터를 반환합니다.", async () => {
    (customFetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponseData)
    });

    const result = await getProduct(mockProductId);

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product/${mockProductId}`,
      false,
      {
        next: {
          tags: [`product-${mockProductId}`]
        }
      }
    );

    expect(result).toEqual(mockResponseData);
  });

  it("응답이 404일 경우 notFound를 호출합니다.", async () => {
    (customFetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404
    });

    await getProduct(mockProductId);

    expect(notFound).toHaveBeenCalled();
  });

  it("응답이 404가 아닌 에러일 경우 에러 객체를 throw 합니다.", async () => {
    (customFetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({
        message: "서버 에러"
      })
    });

    await expect(getProduct(mockProductId)).rejects.toEqual({
      status: 500,
      message: "서버 에러"
    });
  });
});
