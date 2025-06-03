import getWishlistProductData from "../../../api/getWishlistProductData";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { WishlistProductData } from "../../../types/profileTypes";
import { ProductData } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getWishlistProductData", () => {
  const mockWishProductIds = ["product-1", "product-2"];

  const mockResponse: AxiosResponse<WishlistProductData> = {
    data: {
      products: [
        {
          _id: "product-1",
          name: "애플 워치 SE",
          description: "최신 애플 워치 SE 상태 좋음",
          uid: "seller-123",
          createdAt: "2025-05-01T10:30:00Z"
        } as ProductData
      ],
      message: "찜 목록 조회에 성공했어요."
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

  it("limit만 있을 경우 올바른 POST 요청을 보냅니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getWishlistProductData({
      wishProductIds: mockWishProductIds,
      limit: 5
    });

    expect(customAxios.post).toHaveBeenCalledWith("/api/profile/wish?limit=5", {
      wishProductIds: mockWishProductIds
    });

    expect(result).toEqual(mockResponse);
  });

  it("limit과 cursor가 함께 있을 경우 쿼리에 포함됩니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getWishlistProductData({
      wishProductIds: mockWishProductIds,
      limit: 10,
      cursor: "cursor-abc"
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/profile/wish?limit=10&cursor=cursor-abc",
      { wishProductIds: mockWishProductIds }
    );

    expect(result).toEqual(mockResponse);
  });

  it("limit 생략 시 기본값 10을 사용합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    await getWishlistProductData({
      wishProductIds: mockWishProductIds
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/profile/wish?limit=10",
      { wishProductIds: mockWishProductIds }
    );
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(
      getWishlistProductData({ wishProductIds: mockWishProductIds })
    ).rejects.toThrow("찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요.");
  });
});
