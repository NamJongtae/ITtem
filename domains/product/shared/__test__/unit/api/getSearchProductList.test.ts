import getSearchProductList from "@/domains/product/shared/api/getSearchProductList";
import customAxios from "@/shared/common/utils/customAxios";
import { ProductCategory, ProductData } from "../../../types/productTypes";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductListResponseData } from "../../../types/reponseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getSearchProductList API 함수 테스트", () => {
  const mockKeyword = "셔츠";
  const mockCursor = "cursor123";
  const mockLimit = 5;
  const mockCategory = ProductCategory.의류;

  const mockResponse: AxiosResponse<ProductListResponseData> = {
    data: {
      products: [{ _id: "product1", name: "셔츠1" } as ProductData],
      message: "검색에 성공했어요."
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

  it("keyword, category, cursor, limit을 쿼리에 포함하여 GET 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getSearchProductList({
      keyword: mockKeyword,
      category: mockCategory,
      cursor: mockCursor,
      limit: mockLimit
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/search?keyword=${mockKeyword}&category=${mockCategory}&cursor=${mockCursor}&limit=${mockLimit}`
    );
    expect(result).toEqual(mockResponse);
  });

  it("cursor가 없으면 cursor 없이 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getSearchProductList({
      keyword: mockKeyword,
      category: mockCategory,
      limit: mockLimit
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/search?keyword=${mockKeyword}&category=${mockCategory}&limit=${mockLimit}`
    );
  });

  it("limit가 없는 경우 'limit=10'이 쿼리에 포함하여 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getSearchProductList({
      keyword: mockKeyword,
      category: ProductCategory.전체
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/search?keyword=${mockKeyword}&category=${ProductCategory.전체}&limit=10`
    );
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("검색에 실패했어요.\n잠시 후 다시 시도해주세요");
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(
      getSearchProductList({
        keyword: mockKeyword,
        category: mockCategory
      })
    ).rejects.toThrow("검색에 실패했어요.\n잠시 후 다시 시도해주세요");
  });
});
