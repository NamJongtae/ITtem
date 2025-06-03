import deleteWishlistProductData from "../../../api/deleteWishlistProductData";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { DeleteWishlistProductDataResponseData } from "../../../types/profileTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("deleteWishlistProductData API 함수 테스트", () => {
  const mockWishProductIds = ["product-1", "product-2"];

  const mockResponse: AxiosResponse<DeleteWishlistProductDataResponseData> = {
    data: {
      wishProductIds: ["product-3"],
      message: "찜 목록 삭제에 성공했어요."
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

  it("wishProductIds를 포함한 DELETE 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await deleteWishlistProductData(mockWishProductIds);

    expect(customAxios.delete).toHaveBeenCalledWith("/api/profile/wish", {
      data: { wishProductIds: mockWishProductIds }
    });
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(deleteWishlistProductData(mockWishProductIds)).rejects.toThrow(
      "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
