import getReceivedReviews from "../../../api/getReceivedReviews";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ReceivedReviewsResponseData } from "../../../types/responseTypes";
import { ProfileReviewData } from "../../../types/profileTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getReceivedReviews API 함수 테스트", () => {
  const mockUid = "user-123";

  const mockResponse: AxiosResponse<ReceivedReviewsResponseData> = {
    data: {
      reviews: [
        {
          _id: "review-1",
          reviewScore: 5,
          productName: "나이키 운동화",
          productId: "product-123",
          reviewContent: "정말 친절하고 빠른 거래였어요!"
        } as ProfileReviewData
      ],
      message: "리뷰 목록 조회에 성공했어요."
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

  it("limit만 전달했을 때 GET 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getReceivedReviews({ uid: mockUid, limit: 5 });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/profile/${mockUid}/review?limit=5`
    );
    expect(result).toEqual(mockResponse);
  });

  it("cursor도 있을 경우 쿼리에 포함됩니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getReceivedReviews({
      uid: mockUid,
      limit: 20,
      cursor: "cursor-xyz"
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/profile/${mockUid}/review?limit=20&cursor=cursor-xyz`
    );
    expect(result).toEqual(mockResponse);
  });

  it("limit을 생략하면 기본값 10이 적용됩니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getReceivedReviews({ uid: mockUid });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/profile/${mockUid}/review?limit=10`
    );
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "리뷰 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getReceivedReviews({ uid: mockUid })).rejects.toThrow(
      "리뷰 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
