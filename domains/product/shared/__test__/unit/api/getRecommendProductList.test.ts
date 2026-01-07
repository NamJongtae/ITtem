import getRecommendProductList from "@/domains/product/shared/api/getRecommendProductList";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductListResponseData } from "../../../types/reponseTypes";
import { ProductData } from "../../../types/productTypes";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

const mockedCustomFetch = customFetch as jest.MockedFunction<
  typeof customFetch
>;

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
    mockedCustomFetch.mockResolvedValue(mockData);

    await getRecommendProductList(mockCursor, mockLimit);

    const [calledUrl, calledOptions] = (customFetch as jest.Mock).mock.calls[0];

    expect(calledOptions).toEqual({
      next: { revalidate: 86400, tags: ["product-recommend"] }
    });

    const url = new URL(calledUrl, "http://localhost"); // base는 아무거나
    expect(url.pathname).toBe("/api/product/recommend");
    expect(url.searchParams.get("cursor")).toBe(mockCursor);
    expect(url.searchParams.get("limit")).toBe(String(mockLimit));
  });

  it("cursor가 null일 경우 cursor 없이 요청을 보냅니다.", async () => {
    mockedCustomFetch.mockResolvedValue(mockData);

    await getRecommendProductList(null, mockLimit);

    const params = new URLSearchParams({
      limit: String(mockLimit)
    });

    expect(customFetch).toHaveBeenCalledWith(
      `/api/product/recommend?${params.toString()}`,
      {
        next: {
          revalidate: 86400,
          tags: ["product-recommend"]
        }
      }
    );
  });

it("limit가 없는 경우 기본값(limit=10)을 쿼리에 포함하여 요청을 보냅니다.", async () => {
  mockedCustomFetch.mockResolvedValue(mockData);

  await getRecommendProductList(mockCursor);

  const [calledUrl] = (customFetch as jest.Mock).mock.calls[0];

  const url = new URL(calledUrl, "http://localhost");
  expect(url.pathname).toBe("/api/product/recommend");
  expect(url.searchParams.get("cursor")).toBe(mockCursor);
  expect(url.searchParams.get("limit")).toBe("10");
});

  it("customFetch 에러를 가공하지 않고 그대로 전파합니다.", async () => {
    const fetchError = {
      status: 500,
      message: "추천 상품 목록 조회에 실패했어요."
    };

    mockedCustomFetch.mockRejectedValue(fetchError);

    await expect(
      getRecommendProductList(mockCursor, mockLimit)
    ).rejects.toEqual(fetchError);
  });
});
