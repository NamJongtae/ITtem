import uploadProductReview from "@/domains/product/manage/api/uploadProductReview";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { UploadProductReviewResponseData } from "@/domains/product/shared/types/reponseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("uploadProductReview", () => {
  const mockData = {
    productId: "product123",
    reviewScore: 5,
    reviewContent: "정말 만족스러운 상품이에요!",
    reviewTags: [1, 3]
  };

  const mockResponse: AxiosResponse<UploadProductReviewResponseData> = {
    data: {
      message: "상품 리뷰 작성에 성공했어요."
    },
    status: 201,
    statusText: "Created",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("리뷰 정보를 포함한 POST 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await uploadProductReview(mockData);

    expect(customAxios.post).toHaveBeenCalledWith(
      `/api/product/${mockData.productId}/review`,
      {
        reviewScore: mockData.reviewScore,
        reviewContent: mockData.reviewContent,
        reviewTags: mockData.reviewTags
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "상품 리뷰 작성에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(uploadProductReview(mockData)).rejects.toThrow(error);
  });
});
