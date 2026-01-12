import getWishlistProductData from "../../../api/getWishlistProductData";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { WishlistProductData } from "../../../types/profileTypes";
import { mocked } from "jest-mock";
import { WishlistProductResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("getWishlistProductData", () => {
  const mockCustomAxios = mocked(customAxios);

  const mockResponse: AxiosResponse<WishlistProductResponseData> = {
    data: {
      products: [
        {
          _id: "product-1",
          name: "애플 워치 SE",
          imgData: [{ name: "상품1", url: "product1_img.com" }],
          createdAt: "2025-05-01T10:30:00Z",
          price: 1000,
          location: "서울 강남구"
        } as WishlistProductData
      ],
      message: "찜 목록 조회에 성공했어요."
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: { headers: new AxiosHeaders() }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("limit만 있을 경우 올바른 요청을 보냅니다.", async () => {
    mockCustomAxios.mockResolvedValue(mockResponse as any);

    const result = await getWishlistProductData({ limit: 5 });

    expect(mockCustomAxios).toHaveBeenCalledWith("/api/profile/wish?limit=5");
    expect(result).toEqual(mockResponse);
  });

  it("limit과 cursor가 함께 있을 경우 쿼리에 포함됩니다.", async () => {
    mockCustomAxios.mockResolvedValue(mockResponse as any);

    const result = await getWishlistProductData({
      limit: 10,
      cursor: "cursor-abc"
    });

    expect(mockCustomAxios).toHaveBeenCalledWith(
      "/api/profile/wish?limit=10&cursor=cursor-abc"
    );
    expect(result).toEqual(mockResponse);
  });

  it("limit 생략 시 기본값 10을 사용합니다.", async () => {
    mockCustomAxios.mockResolvedValue(mockResponse as any);

    await getWishlistProductData({});

    expect(mockCustomAxios).toHaveBeenCalledWith("/api/profile/wish?limit=10");
  });

  it("limit 생략 + cursor만 있을 경우 cursor가 포함됩니다.", async () => {
    mockCustomAxios.mockResolvedValue(mockResponse as any);

    await getWishlistProductData({ cursor: "cursor-abc" });

    expect(mockCustomAxios).toHaveBeenCalledWith(
      "/api/profile/wish?limit=10&cursor=cursor-abc"
    );
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    mockCustomAxios.mockRejectedValue(error);

    await expect(
      getWishlistProductData({ limit: 10, cursor: "cursor-abc" })
    ).rejects.toThrow("찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요.");
  });
});
