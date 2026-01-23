import getProduct from "@/domains/product/shared/api/getProduct";
import { ProductDetailResponseData } from "@/domains/product/detail/types/responseTypes";
import { ProductDetailData } from "@/domains/product/detail/types/productDetailTypes";
import { customFetch } from "@/shared/common/utils/customFetch";
import { notFound } from "next/navigation";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  })
}));

describe("getProduct API 함수 테스트", () => {
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
    (customFetch as jest.Mock).mockResolvedValue(mockResponseData);

    const result = await getProduct(mockProductId);

    expect(customFetch).toHaveBeenCalledWith(`/api/product/${mockProductId}`, {
      next: {
        tags: [`product-${mockProductId}`],
        revalidate: 180
      }
    });

    expect(result).toEqual(mockResponseData);
  });

  it("customFetch가 404 에러를 throw하면 notFound를 호출합니다.", async () => {
    (customFetch as jest.Mock).mockRejectedValue({
      status: 404,
      message: "Not Found"
    });

    await expect(getProduct(mockProductId)).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("404가 아닌 에러는 그대로 전파합니다.", async () => {
    const fetchError = {
      status: 500,
      message: "서버 에러"
    };

    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(getProduct(mockProductId)).rejects.toEqual(fetchError);
  });
});
