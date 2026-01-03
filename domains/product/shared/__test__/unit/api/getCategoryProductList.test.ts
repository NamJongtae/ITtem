import getCategoryProductList from "@/domains/product/shared/api/getCategoryProductList";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { ProductListResponseData } from "@/domains/product/shared/types/reponseTypes";

/**
 * customFetch mock
 */
jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

describe("getCategoryProductList API 함수 테스트", () => {
  const mockResponseData: ProductListResponseData = {
    message: "상품 목록 조회에 성공했어요.",
    products: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("category가 없으면 '전체', limit이 없으면 '10'을 쿼리에 포함하여 요청합니다.", async () => {
    (customFetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponseData)
    });

    const result = await getCategoryProductList({});

    const params = new URLSearchParams({
      category: "전체",
      limit: String(10)
    });

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product?${params.toString()}`,
      false,
      {
        next: {
          revalidate: 60,
          tags: ["products", "products-전체"]
        }
      }
    );

    expect(result).toEqual(mockResponseData);
  });

  it("category, cursor, limit, location이 있으면 모두 쿼리에 포함하여 요청합니다.", async () => {
    const category = ProductCategory.전자기기;
    const cursor = "abc123";
    const limit = 5;
    const location = "서울";

    (customFetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponseData)
    });

    await getCategoryProductList({
      category,
      cursor,
      limit,
      location
    });

    const params = new URLSearchParams({
      category,
      limit: String(limit)
    });
    params.append("cursor", cursor);
    params.append("location", location);

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product?${params.toString()}`,
      false,
      {
        next: {
          revalidate: 60,
          tags: ["products", `products-${category}`]
        }
      }
    );
  });

  it("응답이 ok가 아니면 status와 message를 포함한 객체를 throw 합니다.", async () => {
    const category = ProductCategory.전자기기;

    (customFetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({
        message: "상품 목록 조회에 실패했어요."
      })
    });

    await expect(getCategoryProductList({ category })).rejects.toEqual({
      status: 500,
      message: "상품 목록 조회에 실패했어요."
    });
  });

  it("에러 응답에 message가 없으면 기본 메시지를 사용합니다.", async () => {
    const category = ProductCategory.전자기기;

    (customFetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({})
    });

    await expect(getCategoryProductList({ category })).rejects.toEqual({
      status: 500,
      message: `${category} 상품 목록 조회에 실패했어요.`
    });
  });
});
