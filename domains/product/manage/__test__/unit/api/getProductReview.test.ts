import getProductReview from "../../../api/getProductReview";
import customAxios from "@/shared/common/utils/customAxios";
import { ProductReviewResponseData } from "../../../types/responseTypes";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProductReviewData } from "../../../types/productManageTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getProductReview", () => {
  const mockProductId = "product123";

  const mockResponse: AxiosResponse<ProductReviewResponseData> = {
    data: {
      review: {
        reviewTags: [1, 2],
        reviewScore: 30,
        reviewContent: "좋은 상품이에요."
      } as ProductReviewData,
      message: "상품 리뷰 조회에 성공했어요."
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

  it("상품 ID를 포함한 GET 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getProductReview(mockProductId);

    expect(customAxios).toHaveBeenCalledWith(
      `/api/product/${mockProductId}/review`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 리뷰 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getProductReview(mockProductId)).rejects.toThrow(error);
  });
});
