import purchaseRequestReject from "@/domains/product/manage/api/purchaseRequestReject";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("purchaseRequestReject", () => {
  const mockProductId = "product1010";
  const mockCancelReason = "재고 부족으로 인한 거절";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "구매 요청 거절에 성공했어요."
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

  it("productId와 cancelReason을 포함한 PATCH 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await purchaseRequestReject(mockProductId, mockCancelReason);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/trading/sales/${mockProductId}/purchase-request-reject`,
      { cancelReason: mockCancelReason }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "구매 요청 거절에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(
      purchaseRequestReject(mockProductId, mockCancelReason)
    ).rejects.toThrow(error);
  });
});
